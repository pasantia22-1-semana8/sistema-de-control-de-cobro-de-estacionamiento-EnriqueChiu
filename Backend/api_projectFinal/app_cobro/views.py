from rest_framework.views import Response, APIView
from rest_framework import status
from rest_framework import viewsets


from app_cobro import serializers, models


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
      

class TarifaView(viewsets.ModelViewSet):

  serializer_class = serializers.TarifaSerializer
  queryset = models.Tarifa.objects.all()

  def create(self, request):
    serializer = serializers.TarifaSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
      serializer.save()
      res = {
        'created': True,
        'message': 'Tarifa creado correctamente'
      }
      return Response(res, status=status.HTTP_200_OK)
    else:
      res = {
        'created': False,
        'error': 'No se creo correctamente la Tarifa, verifique si la tarifa ya existe o no lleno todos los campos'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)

'''
  def get_queryset(self):
    queryset = models.Tarifa.objects.all()
    idVehiculo = self.request.query_params.get('idVehiculo')
    idResidente = self.request.query_params.get('idResidente')
    if idVehiculo is not None and idResidente is not None:
      filtro1 = queryset.filter(tipo_vehiculo=idVehiculo)
      queryset = filtro1.filter(tipo_residente=idResidente)
      if len(queryset)==0:
        queryset = [{}]

    return queryset
'''

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
      

class TickerView(viewsets.ModelViewSet):

  serializer_class = serializers.TickerSerializer
  queryset = models.Ticker.objects.all()

  def create(self, request):
    serializer = serializers.TickerSerializer(data=request.data)
    if serializer.is_valid():

      serializer.save()
      res = {
        'created': True,
        'message': 'Ticker creado correctamente'
      }
      return Response(res, status=status.HTTP_200_OK)
    else:
      res = {
        'created': False,
        'error': 'No se creo el Ticker, verifique si lleno todos los campos'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)

  def get_queryset(self):
    queryset = models.Ticker.objects.all()
    id = self.request.query_params.get('id')

    if id is not None:
      prueba = queryset.filter(no_ticker=id)
      if len(prueba)==0:
        queryset2 = models.Vehiculo.objects.all()
        vehiculo = queryset2.filter(no_placa__iexact=id).get()
        queryset = queryset.filter(no_placa=vehiculo)

      else:
        queryset = prueba
    return queryset


class CajaView(viewsets.ModelViewSet):

  serializer_class = serializers.CajaSerializer
  queryset = models.Caja.objects.all()

  def create(self, request):
    serializer = serializers.CajaSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      res = {
        'created': True,
        'message': 'Caja creado correctamente'
      }
      return Response(res, status=status.HTTP_200_OK)
    else:
      res = {
        'created': False,
        'error': 'No se creo la caja, verifique si hay otra caja abierta'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)
      