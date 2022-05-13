from django.shortcuts import render
from rest_framework.views import Response, APIView
from rest_framework import status
from rest_framework import viewsets

from app_vehiculo import serializers, models

class Tipo_vehiculoView(viewsets.ModelViewSet):

  serializer_class = serializers.Tipo_vehiculoSerializer
  queryset = models.Tipo_vehiculo.objects.all()

  def create(self, request):
    serializer = serializers.Tipo_vehiculoSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      res = {
        'created': True,
        'message': 'Tipo de Vehiculo creado correctamente'
      }
      return Response(res, status=status.HTTP_200_OK)
    else:
      res = {
        'created': False,
        'error': 'No se creo correctamente el Tipo vehiculo, verifique si ingreso un tipo ya existente o no lleno todos los campos'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)

  def destroy(self, request, *args, **kwargs):
    tipo = self.get_object()
    tipo.delete()
    return Response({"message": "Se elimino correctamente"})


class Tipo_residenteView(viewsets.ModelViewSet):

  serializer_class = serializers.Tipo_residenteSerializer
  queryset = models.Tipo_residente.objects.all()

  def create(self, request):
    serializer = serializers.Tipo_residenteSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      res = {
        'created': True,
        'message': 'Tipo de Residente creado correctamente'
      }
      return Response(res, status=status.HTTP_200_OK)
    else:
      res = {
        'created': False,
        'error': 'No se creo correctamente el Tipo residente, verifique si ingreso un tipo ya existente o no lleno todos los campos'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)
      
  def destroy(self, request, *args, **kwargs):
    tipo = self.get_object()
    tipo.delete()
    return Response({"message": "Se elimino correctamente"})

class VehiculoView(viewsets.ModelViewSet):

  serializer_class = serializers.VehiculoSerializer
  queryset = models.Vehiculo.objects.all()

  def create(self, request):
    serializer = serializers.VehiculoSerializer(data=request.data)
    if serializer.is_valid():

      serializer.save()
      res = {
        'created': True,
        'message': 'Vehiculo creado correctamente'
      }
      return Response(res, status=status.HTTP_200_OK)
    else:
      res = {
        'created': False,
        'error': 'No se registro el vehiculo, verifique si el vehiculo ya esta registrado o no lleno todos los campos'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)
      
  def destroy(self, request, *args, **kwargs):
    vehiculo = self.get_object()
    vehiculo.delete()
    return Response({"message": "Se elimino correctamente"})
