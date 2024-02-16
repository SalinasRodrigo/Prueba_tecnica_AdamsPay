from django.contrib import admin

# Register your models here.
from .models import Product, Debt

admin.site.register(Product)
admin.site.register(Debt)
