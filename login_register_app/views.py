from django.core.checks import messages
from django.shortcuts import render, redirect
from django.http import HttpResponse, response
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate,logout
from jwt import algorithms
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
import traceback
from django.contrib.auth import login as auth_login
import jwt,datetime
from .serializers import *

def login(request):
    return render(request,'login.html')


def register(request):
    return render(request, 'register.html')


class profile(APIView):

    def get(self,request):
        token=request.COOKIES.get('jwt')
        if not token:
            return redirect('login')
        try:
            payload=jwt.decode(token,'secret',algorithms=['HS256'])
        
        except jwt.ExpiredSignatureError:
             return redirect('login')

        user=UserDetails.objects.filter(username=payload['username']).values_list()
        return render(request, 'profile.html')


class logout(APIView):
    def post(self,request):
        response=Response()
        response.delete_cookie('jwt')
        response.data={
            "message":"success"
        }
        return response



class VerifyLogin(ListCreateAPIView):
    def post(self, request):
        data = request.data
        if(UserDetails.objects.filter(email=data["email"]).exists()):
            username=UserDetails.objects.filter(email=data["email"]).values_list("username",flat=True).first()
            user = authenticate(username=username, password=data["password"])
            if user is not None:
                payload={

                    "username":user.username,
                    "exp":datetime.datetime.utcnow()+datetime.timedelta(minutes=5),
                    "iat":datetime.datetime.utcnow()
                }

                token=jwt.encode(payload,'secret',algorithm='HS256')

                response=Response()

                response.set_cookie(key='jwt',value=token,httponly=True)

                response.data={
                    "jwt":token
                }


                return response
            else:
                return Response({"message":"Invalid password"})
                
        else:
            if not UserDetails.objects.filter(email=data["email"]).exists():
                return Response({"message":"user not found"})




class VerifyRegister(ListCreateAPIView):
    def post(self, request):
        try:
            data = request.data
            if User.objects.filter(username = data["username"]).exists() or UserDetails.objects.filter(email=data["email"]).exists():
                 return Response({"message":"user with same name or email already exists"})
            else:
                user=User(username=data["username"],email=data["email"])
                user.set_password(data["password"])
                user.save()
                fulldetails=UserDetails(user=user,username=data["username"],address=data["address"],email=data["email"])
                fulldetails.save()
                return Response({"message":"success"})
        except:
            traceback.print_exc()
            return Response({'message': "try after sometime"})

class senddetails(ListCreateAPIView):
    def get(self,request):
        try:
            data=self.get_queryset()
            return Response(data)
        except:
            traceback.print_exc()
            return Response({'message': "Try after some time"})

    def get_queryset(self):
        userdata =list(UserDetails.objects.all().values().exclude(username=None))
        return (userdata)


class editdetails(ListCreateAPIView):
    def post(self, request):
        token=request.COOKIES.get('jwt')
        if not token:
            return redirect('login')
        try:
            payload=jwt.decode(token,'secret',algorithms=['HS256'])
        
        except jwt.ExpiredSignatureError:
             return redirect('login')
        try:
            data = request.data
            if(User.objects.filter(username=data["username"]).exclude(id=data["userid"]).exists()):
                return Response({'message': "user name is already taken"})
            currentuser=User.objects.get(id=data["userid"])
            currentuser.username=data['username']
            currentuser.email=data['email']
            currentuser.save()
            current=UserDetails.objects.get(id=data["userid"])
            current.email=data['email']
            current.username=data['username']
            current.address=data['address']
            current.save()
            return Response({"message":"success"})
        except:
            traceback.print_exc()
            return Response({'message': "try after sometime"})


class deletedetails(ListCreateAPIView):
    def post(self, request):
        token=request.COOKIES.get('jwt')
        if not token:
            return redirect('login')
        try:
            payload=jwt.decode(token,'secret',algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return redirect('login')
        try:
            data = request.data
            currentuser=User.objects.filter(id=data["userid"])
            currentuser.delete()
            return Response({"message":"success"})
        except:
            traceback.print_exc()
            return Response({'message': "try after sometime"})
