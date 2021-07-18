from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class UserDetails(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    username=models.CharField(max_length=100,null=True)
    address=models.CharField(max_length=500,null=True)
    email=models.EmailField(null=True)
