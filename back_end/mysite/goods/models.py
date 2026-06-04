from django.db import models

class Goods(models.Model):
    title = models.CharField(max_length=50,verbose_name='タイトル')
    content = models.TextField(max_length=2000,verbose_name="内容")
    picture = models.ImageField(upload_to="goods/picture/", blank=True, null=True, verbose_name="写真")
    created_at = models.DateTimeField(auto_now_add=True,verbose_name="作成日時")
    public = models.BooleanField(default=True,verbose_name="公開")

    
    def __str__(self):
        return self.title
    
    
    class Meta:
        verbose_name = '商品'
        verbose_name_plural = '商品'
