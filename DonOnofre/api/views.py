from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializaers import ProductSerializer 


# Create your views here.
@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            "Endpoint": "/products/",
            "method": "GET",
            "body": None,
            "description": "Returns an array of products",
        },
        {
            "Endpoint": "/products/id",
            "method": "GET",
            "body": None,
            "description": "Returns a single product object",
        },
        {
            "Endpoint": "/products/create/",
            "method": "POST",
            "body": {"body": ""},
            "description": "Creates new product with data sent in post request",
        },
        {
            "Endpoint": "/products/id/update/",
            "method": "PUT",
            "body": {"body": ""},
            "description": "Creates an existing product with data sent in post request",
        },
        {
            "Endpoint": "/products/id/delete/",
            "method": "DELETE",
            "body": None,
            "description": "Deletes and exiting product",
        },
    ]
    return Response(routes)


@api_view(["GET"])
def getProducts (request):
    products = Product.objects.all()
    serial_products = ProductSerializer(products, many=True)
    return Response(serial_products.data)

@api_view(["GET"])
def getOneProduct (request, pk):
    product = Product.objects.get(id=pk)
    serial_product = ProductSerializer(product, many=False)
    return Response(serial_product.data)

@api_view(["PUT"])
def updateProduct (request, pk):
    data = request.data
    product = Product.objects.get(id=pk)
    serialProduct = ProductSerializer(instance=product, data=data)

    if serialProduct.is_valid():
        serialProduct.save()

    return Response(serialProduct.data) 

@api_view(["POST"])
def createProduct (request):
    data = request.data
    product = Product.objects.create(
        title = data['title'],
        description = data['description'],
        price = data['price'],
        discountPercentage = data['discountPercentage'],
        stock = data['stock'],
        brand = data['brand'],
        category = data['category'],
        thumbnail = data['thumbnail'],
    )
    serialProduct = ProductSerializer(product, many=False)
    return Response(serialProduct.data)

@api_view(['DELETE'])
def deleteProduct (request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response("delete succese")