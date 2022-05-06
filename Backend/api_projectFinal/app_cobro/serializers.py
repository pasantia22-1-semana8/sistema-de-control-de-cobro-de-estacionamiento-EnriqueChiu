from rest_framework import serializers
from app_cobro import models


class Tipo_vehiculoSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Tipo_vehiculo
    fields = '__all__'



class Tipo_residenteSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Tipo_residente
    fields = '__all__'


class TarifaSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Tarifa
    fields = '__all__'


class VehiculoSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Vehiculo
    fields = '__all__'


class TickerSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Ticker
    fields = '__all__'


class CajaSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Caja
    fields = '__all__'



