from django.contrib import admin
from .models import *

# Register your models here.

class UserDetailsAdmin(admin.ModelAdmin):
    list_display=("user","address","email")



admin.site.register(UserDetails,UserDetailsAdmin)