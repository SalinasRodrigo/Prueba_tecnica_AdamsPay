from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.getRoutes, name="routes"),
    path('products/', view=views.getProducts, name="products"),
    path('products/<int:pk>/', view=views.getOneProduct, name="one-product"),
    path('products/<int:pk>/update', view=views.updateProduct, name="update-product"),
    path('products/<int:pk>/delete', view=views.deleteProduct, name="delete-product"),
    path('products/create', view=views.createProduct, name="create-product"),
]