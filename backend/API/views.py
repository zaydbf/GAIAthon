from django.shortcuts import render
from .models import User

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
    
