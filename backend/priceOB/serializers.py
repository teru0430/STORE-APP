from rest_framework import serializers
from .models import URLModel
from update import amazon_tarack_price

class URLModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = URLModel
        fields = ['id', 'title', 'url',  'price']
        read_only_fields = ['id', 'created_at', 'user', 'price']

    def create(self, validated_data):
        """URLを新規作成"""
        user = self.context['request'].user
        print(validated_data['url'])
        if not'https://www.amazon.co.jp' in validated_data['url']:
            raise serializers.ValidationError("URLはAmazon.co.jpのもののみ許可されています。")
        validated_data['user'] = user
        try:
            amazon_price = amazon_tarack_price(validated_data['url'])
        except:
            raise serializers.ValidationError("商品の値段を取得できませんでした。")
        validated_data['price'] = amazon_price
        return URLModel.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """URLを更新"""
        instance.title = validated_data.get('title', instance.title)
        instance.url = validated_data.get('url', instance.url)
        instance.save()
        return instance


