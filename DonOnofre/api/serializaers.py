from rest_framework.serializers import ModelSerializer
from .models import Product
from django.contrib.auth.models import User

class ProductSerializer (ModelSerializer):
  class Meta:
    model = Product
    fields = '__all__'

class UserSerializer (ModelSerializer):
  class Meta:
    model = User
    fields = ['username','email']
