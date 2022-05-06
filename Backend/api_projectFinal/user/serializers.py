from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from user import models


class UserModelSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Profile
    fields = (
      'username',
      'rol',
      'is_staff'
    )


class RolSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Rol
    fields= '__all__'


class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(username=data['username'], password=data['password'])
    if not user:
      raise serializers.ValidationError('')
    self.context['user'] = user
    return data

  def create(self, data):
    token, created = Token.objects.get_or_create(user=self.context['user'])
    return self.context['user'], token.key


class RegisterSerializer(serializers.Serializer):

  username = serializers.CharField()
  email = serializers.EmailField()
  rol = serializers.IntegerField()

  def validate(self, data):
    try:
      user = models.Profile(username=data['username'], email=data['email'], rol=models.Rol.objects.filter(id=data['rol']).get())
      user.set_password('123456')
      user.save()
    except:
      raise serializers.ValidationError('')
    return data