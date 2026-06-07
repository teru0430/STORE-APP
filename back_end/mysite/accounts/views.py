from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, RegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


# Create your views here.
@api_view(['POST'])
def register(request):
    data = request.data
    
    user = RegisterSerializer(data=data)
    
    if user.is_valid():
        if User.objects.filter(username=data['username']).exists():
            return Response({'message': 'This username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        elif User.objects.filter(email=data['email']).exists():
            return Response({'message': 'This email already exists'}, status=status.HTTP_400_BAD_REQUEST)   
        else:
            user = User.objects.create(
                username = data['username'],
                email = data['email'],
                password = make_password(data['password'])
            )
            return Response({'message': 'User Regiser Success'}, status=status.HTTP_201_CREATED)
    else:
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)    
    



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMe(request):
    user = request.user
    
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
    