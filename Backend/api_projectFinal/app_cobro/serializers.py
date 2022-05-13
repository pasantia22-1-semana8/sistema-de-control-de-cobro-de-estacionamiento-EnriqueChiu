from rest_framework import serializers
from app_cobro import models
from app_vehiculo.serializers import Tipo_residenteSerializer
from app_vehiculo.serializers import Tipo_vehiculoSerializer


class TarifaSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Tarifa
    fields = '__all__'

  def to_representation(self, instance):
    response =  super().to_representation(instance)
    response['tipo_vehiculo'] = Tipo_vehiculoSerializer(instance.tipo_vehiculo).data['nombre']
    response['tipo_residente'] = Tipo_residenteSerializer(instance.tipo_residente).data['nombre']
    return response

class TickerSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Ticker
    fields = '__all__'

  def to_representation(self, instance):
    response =  super().to_representation(instance)
    response['tarifa'] = TarifaSerializer(instance.tarifa).data['tarifa']
    return response

class CajaSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.Caja
    fields = '__all__'



