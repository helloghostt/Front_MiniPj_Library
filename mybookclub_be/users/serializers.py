from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')

class UserCreateSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'email')
                #   , 'password'

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            # password=validated_data['password']
        )
        return user