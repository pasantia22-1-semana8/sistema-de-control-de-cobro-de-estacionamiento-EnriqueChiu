from rest_framework import serializers
from app_vehiculo import models


class Tipo_vehiculoSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Tipo_vehiculo
    fields = '__all__'



class Tipo_residenteSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Tipo_residente
    fields = '__all__'


class VehiculoSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Vehiculo
    fields = '__all__'
