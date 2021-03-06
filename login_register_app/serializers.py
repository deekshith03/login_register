from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers

from .models import *

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserDetails
        fields=('username','address','email')
