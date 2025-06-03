from django.shortcuts import render
from .models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view # Turns a regular Django function into a DRF (Django REST Framework) API view.
from rest_framework.response import Response # Sends structured JSON responses from the API so we can return Response({"message": "OK"}, status=200)
from rest_framework import status # Cleaner Code using HTTP status so instead of status=201 I use status=status.HTTP_201_CREATED (this better for bigger project to avoid mistakes)

# Create your views here.

@api_view(['POST'])
def signup(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    User.objects.create_user(username, email, password)
    return Response({
        "message" : "User Created",
    },
    status=status.HTTP_201_CREATED
    )
    
@api_view(['POST'])
def signin(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)
    if user is not None:
        return Response({"message": "Login successful", "username": username}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)    
