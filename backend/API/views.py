from django.shortcuts import render
from .models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view # Turns a regular Django function into a DRF (Django REST Framework) API view.
from rest_framework.response import Response # Sends structured JSON responses from the API so we can return Response({"message": "OK"}, status=200)
from rest_framework import status # Cleaner Code using HTTP status so instead of status=201 I use status=status.HTTP_201_CREATED (this better for bigger project to avoid mistakes)
from rest_framework_simplejwt.tokens import RefreshToken
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain.chains import LLMChain
import os
import csv
from io import StringIO
import json

from data.models import Gas, Region
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from django.http import JsonResponse, HttpResponseBadRequest

# Prompt templates from prompt.ts
DEFAULT_PROMPT = """
Role: You are the AI assistant for CarbonSens, an innovative environmental monitoring system developed for GAIAthon'25. 
Answer questions about sensor data, project details, and technical insights using the information below. 
For unknown queries: "I don't have that information yet - our team is actively developing this feature."

## Project Vision
CarbonSens revolutionizes environmental monitoring by combining advanced IoT sensors with AI-powered analytics to track, predict, and optimize carbon emissions in real-time. Developed for GAIAthon'25 in the "Digital Platforms and Interactive Applications" category.

## Development Team
👥 CarbonSens Creators:
- Zayd Ben Fadhel (SUP'COM Tunis)
- Jawher Sadok (SUP'COM Tunis)
- Mohamed Mdhaffar (SUP'COM Tunis)
- Youssef Chatti (ENIT/ENSTA Paris - Dual Degree)

## Technical Specifications
### Sensor Array
🔥 **MQ-4 Multi-Gas Sensor**  
- CH4 (methane), LPG, Alcohol, Propane, Hydrogen, CO (all in ppm)

🌫️ **MG811 CO2 Sensor**  
- CO2 concentration (ppm)

🌡️ **BME680 Environmental Sensor**  
- Temperature (°C), Pressure (hPa), Humidity (%)

🛰️ **GPS Module**  
- Time (hh:mm:ss.s), Latitude°, Longitude°, Altitude (m)
- Satellites used, HDOP Accuracy:
  <1.0 🟢 Excellent | 1-2 🟢 Good | 2-5 🟡 Moderate | 5-10 🟠 Poor | >10 🔴 Unreliable

## Hackathon Context
- **Event**: GAIAthon'25 (https://www.gaiathon.com)
- **Track**: Digital Platforms and Interactive Applications
- **Status**: Active development during hackathon
- **Goal**: Create MVP for real-time carbon footprint monitoring

## Data Interpretation Guidelines
1. **Critical Thresholds**:
   - CO2 > 1000 ppm = Poor air quality
   - CO > 35 ppm = Potential hazard
   - CH4 > 50 ppm = Possible gas leak

2. **Environmental Correlations**:
   - High humidity → Gas sensor calibration drift
   - Low pressure → Altitude compensation needed
   - HDOP > 5 → Verify location-dependent readings

3. **Hackathon Constraints**:
   - Data may be simulated during development phases
   - Features prioritized for MVP demonstration
   - Final calibration pending post-hackathon testing

## Response Protocol
- For technical inquiries: Explain sensor principles briefly
- For team info: Highlight our academic backgrounds
- For hackathon queries: Mention GAIAthon'25 context
- For data requests: Include units and confidence indicators
- Example: "Current GPS accuracy is 🟠 Moderate (HDOP 6.2) - recommend outdoor verification"

## Support Paths
- Technical issues: @zaydbenfadhel (LinkdIn)
- Data interpretation: @youssefchatti (LinkdIn)
- Hackathon submissions: GAIAthon portal
"""

PROMPT_FOOTER_CHAT = """
Current conversation:
{chat_history}

User: {input}
AI:
"""

@api_view(['POST'])
def signup(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    User.objects.create_user(username, email, password)
    return Response({
        "message": "User Created",
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def signin(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user is not None:
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return Response({
            "message": "Login successful",
            "username": username,
            "access_token": access_token,
            "refresh_token": str(refresh)
        }, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def chatbot_response(request):
    """Handle POST requests with conversation history and return a chatbot response."""
    data = request.data
    messages = data.get('messages', [])
    is_analysis_mode = data.get('isAnalysisMode', False)
    uploaded_data = data.get('uploadedData', None)

    if not messages:
        return Response({'error': 'No messages provided'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Format chat history (all messages except the last one)
        chat_history = "\n".join([f"{'User' if msg['isUser'] else 'Assistant'}: {msg['text']}" 
                                 for msg in messages[:-1]])
        current_message = messages[-1]['text']

        if is_analysis_mode and uploaded_data:
            # Process uploaded data (assuming CSV format)
            data_io = StringIO(uploaded_data)
            csv_reader = csv.DictReader(data_io)
            factory_data = list(csv_reader)

            if not factory_data:
                reply = "No valid data found in the upload. Please upload a CSV or enter factory data with FactoryID, CO2Level, and optionally Location."
            else:
                # Validate and process data
                valid_rows = []
                for row in factory_data:
                    if 'FactoryID' in row and 'CO2Level' in row:
                        try:
                            row['CO2Level'] = float(row['CO2Level'])
                            valid_rows.append(row)
                        except ValueError:
                            continue  # Skip rows with invalid CO2Level

                if not valid_rows:
                    reply = "No valid data found. Ensure FactoryID and CO2Level (numeric, in ppm) are provided."
                else:
                    # Analysis: Average CO2, highest emitter, and threshold check
                    co2_levels = [row['CO2Level'] for row in valid_rows]
                    avg_co2 = sum(co2_levels) / len(co2_levels)
                    max_co2_factory = max(valid_rows, key=lambda x: x['CO2Level'], default=None)
                    reply = f"Analyzed {len(valid_rows)} factory entries. Average CO2 level: {avg_co2:.2f} ppm. "
                    if max_co2_factory:
                        reply += f"Highest emitter: Factory {max_co2_factory['FactoryID']} with {max_co2_factory['CO2Level']} ppm at {max_co2_factory.get('Location', 'Unknown')}."
                        # Check CO2 threshold
                        if max_co2_factory['CO2Level'] > 1000:
                            reply += " Warning: CO2 level exceeds 1000 ppm, indicating poor air quality."
                    else:
                        reply += "No maximum CO2 factory identified."

                    # Respond to specific user queries in Analysis Mode
                    if "highest" in current_message.lower() and "co2" in current_message.lower():
                        if max_co2_factory:
                            reply = f"The factory with the highest CO2 is {max_co2_factory['FactoryID']} with {max_co2_factory['CO2Level']} ppm at {max_co2_factory.get('Location', 'Unknown')}."
                            if max_co2_factory['CO2Level'] > 1000:
                                reply += " Warning: CO2 level exceeds 1000 ppm, indicating poor air quality."
                        else:
                            reply = "Unable to determine the highest CO2 factory."
                    elif "average" in current_message.lower() and "co2" in current_message.lower():
                        reply = f"The average CO2 level across all factories is {avg_co2:.2f} ppm."
                    elif len(valid_rows) == 1:
                        # Special case for single factory (manual input)
                        factory = valid_rows[0]
                        reply = f"Factory {factory['FactoryID']} has a CO2 level of {factory['CO2Level']} ppm at {factory.get('Location', 'Unknown')}."
                        if factory['CO2Level'] > 1000:
                            reply += " Warning: CO2 level exceeds 1000 ppm, indicating poor air quality."
                    else:
                        reply = f"Based on the provided data: {reply}. Ask about 'highest CO2' or 'average CO2' for more details."

        else:
            # General chat mode with LangChain
            template = DEFAULT_PROMPT + PROMPT_FOOTER_CHAT
            prompt = PromptTemplate(input_variables=["chat_history", "input"], template=template)

            # Initialize the Groq model
            llm = ChatGroq(
                model="llama3-70b-8192",
                temperature=0,
                api_key=os.getenv('GROQ_API_KEY')
            )

            # Create and run the chain
            chain = LLMChain(llm=llm, prompt=prompt)
            response = chain.run(chat_history=chat_history, input=current_message)
            reply = response

        return Response({'reply': reply}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def ai_prediction(request, gas, region):
    # 1. Get region object
    region = Region.objects.filter(name=region).first()
    if not region:
        return HttpResponseBadRequest("Region not found")

    # 2. Get last 7 days' gas values
    gas_data = Gas.objects.filter(gas=gas, region=region).order_by('-date')[:7]
    if len(gas_data) < 7:
        return HttpResponseBadRequest("Not enough data")

    gas_data = list(reversed(gas_data))  
    concentration = [g.average for g in gas_data]

    # 3. Create DataFrame
    data = {
        'Day': [1, 2, 3, 4, 5, 6, 7],
        'Concentration': concentration
    }
    df = pd.DataFrame(data)

    # 4. Feature Engineering
    df['Day_sin'] = np.sin(2 * np.pi * df['Day']/7)
    df['Day_cos'] = np.cos(2 * np.pi * df['Day']/7)
    df['Lag_1'] = df['Concentration'].shift(1)
    df = df.dropna()

    # 5. Train model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    X = df[['Day', 'Day_sin', 'Day_cos', 'Lag_1']]
    y = df['Concentration']
    model.fit(X, y)

    # 6. Predict next 7 days
    future_days = pd.DataFrame({
        'Day': range(8, 15),
        'Day_sin': np.sin(2 * np.pi * np.arange(8, 15)/7),
        'Day_cos': np.cos(2 * np.pi * np.arange(8, 15)/7)
    })

    predictions = []
    last_known = df['Concentration'].iloc[-1]
    for i in range(7):
        current_features = future_days.iloc[i].copy()
        current_features['Lag_1'] = last_known
        pred = model.predict([current_features[['Day', 'Day_sin', 'Day_cos', 'Lag_1']]])[0]
        predictions.append(float(pred))
        last_known = pred

    return JsonResponse({"predictions": predictions})
