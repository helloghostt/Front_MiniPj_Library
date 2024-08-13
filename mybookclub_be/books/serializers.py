from rest_framework import serializers
from .models import Book, Review

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'content', 'user', 'created_at', 'updated_at']
        read_only_fields = ['user']

class BookSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'reviews', 'description', 'published_date', 'genre', 'cover_image']