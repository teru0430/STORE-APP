from rest_framework import serializers
from .models import URLModel


class URLModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = URLModel
        fields = ['id', 'title', 'url', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

    def create(self, validated_data):
        """URLを新規作成"""
        user = self.context['request'].user
        print(validated_data['url'])
        if 'https://www.amazon.co.jp' in validated_data['url']:
            validated_data['user'] = user
            return URLModel.objects.create(**validated_data)
        else:
            raise serializers.ValidationError("URLはAmazon.co.jpのもののみ許可されています。")

    def update(self, instance, validated_data):
        """URLを更新"""
        instance.title = validated_data.get('title', instance.title)
        instance.url = validated_data.get('url', instance.url)
        instance.save()
        return instance
