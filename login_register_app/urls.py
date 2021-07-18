from django.urls import path
from . import views
from .views import *
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Account pages
    path('login', views.login, name='login'),
    path('register',views.register,name="register"),
    path('',profile.as_view()),
    path('api/logincheck',VerifyLogin.as_view()),
    path('api/RegisterCheck',VerifyRegister.as_view()),
    path('logout',logout.as_view()),
    path('api/senddetails',senddetails.as_view()),
    path('api/edit',editdetails.as_view()),
    path('api/delete',deletedetails.as_view()),
    

]
