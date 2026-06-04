from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GoodsViewSet, getAllGoods, createGoods, getGoodsById, deleteGood, updateGood

router = DefaultRouter()
router.register(r'posts', GoodsViewSet, basename='goods')

urlpatterns = [
    path('', getAllGoods, name='getAllGoods'),
    path('create/', createGoods, name='createGoods'),
    path('<str:pk>/', getGoodsById, name='getGood'),
    path('<str:pk>/delete', deleteGood, name='deleteGood'),
    path('<str:pk>/update', updateGood, name='updateGood'),
    path('', include(router.urls)),
]
