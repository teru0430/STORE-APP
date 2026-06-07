from django.shortcuts import render
from rest_framework import viewsets
from .models import Goods
from .serializers import GoodsSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
# Create your views here.
class GoodsViewSet(viewsets.ModelViewSet):
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer
    
    
@api_view(['GET'])
def getAllGoods(request):
    goods = Goods.objects.all()
    
    serializer = GoodsSerializer(goods, many=True)    
    
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createGoods(request):
    user = request.user
    print(user)
    if user.is_superuser:
        data = request.data
        
        good = Goods.objects.create(
            title = data['title'],
            content = data['content'],
            picture = data['picture'],
        )
    else:
        Response({"messege": "admin only access"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateGood(request, pk):
    user = request.user
    if user.is_superuser:
        data = request.data
        good = get_object_or_404(Goods, id=pk)
        
        good.title = data['title']
        good.content = data['content']
        good.picture = data['picture']
        good.public = data['public']
        
        good.save()
        serializer = GoodsSerializer(good, many=False)
        return Response(serializer.data)
    else:
        Response({"messege": "admin only access"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['GET'])
def getGoodsById(request, pk):
    good = get_object_or_404(Goods, id=pk)
    try:
        
        serializer = GoodsSerializer(good, many=False)
        return Response(serializer.data)
    except:
        return Response({"error": "error..."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteGood(request, pk):
    user = request.user
    if user.is_superuser:
    
        good = get_object_or_404(Goods, id=pk)
        
        good.delete()
        
        return Response({'messege':'delete success'})

    else:
        Response({"messege": "admin only access"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)