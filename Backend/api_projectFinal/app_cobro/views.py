from datetime import date
from rest_framework.views import Response, APIView
from rest_framework import status
from rest_framework import viewsets
from app_cobro import serializers, models


class TarifaView(viewsets.ModelViewSet):

  serializer_class = serializers.TarifaSerializer
  queryset = models.Tarifa.objects.all()

  def create(self, request):
    serializer = serializers.TarifaSerializer(data=request.data)
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

  def destroy(self, request, *args, **kwargs):
    tarifa = self.get_object()
    tarifa.delete()
    return Response({"message": "Se elimino correctamente"})

  def put(self, request, *args, **kwargs):
    tarifa = self.get_object()
    data_tarifa = request.data
    tarifa.name = data_tarifa["name"]
    tarifa.save()
    serializer_class = serializers.TarifaSerializer(tarifa)
    return Response(serializer_class.data)

  def get_queryset(self):
    queryset = models.Tarifa.objects.all()
    no_tarifa = self.request.query_params.get('no_tarifa')
    
    if no_tarifa is not None:
      queryset = queryset.filter(tarifa=no_tarifa)
    
    return queryset


class TickerView(viewsets.ModelViewSet):

  serializer_class = serializers.TickerSerializer
  queryset = models.Ticker.objects.all()


  def getIDTipoResidente(self):
    tipoResidente = models.Tipo_residente.objects.get(nombre__iexact='residente')
    return str(tipoResidente.id)

  def getIDVehiculo(self, placa):
    vehiculo = models.Vehiculo.objects.get(no_placa__iexact=placa)
    return str(vehiculo.id)

  def getTarifa(self, idVehiculo, idResidente):
    tarifa = models.Tarifa.objects.get(tipo_vehiculo=idVehiculo, tipo_residente=idResidente)
    return str(tarifa.id)

  def create(self, request):
    now = date.today()
    id = models.Ticker.objects.all().count()+1
    idticker = '{}{}{}{}'.format(now.day, now.month, now.year, id)
      
    if (type(request.data) is dict):
      isResidente = self.getIDTipoResidente() == request.data['tipo_residente']
      idplaca = self.getIDVehiculo(request.data['no_placa'])
      tarifa = self.getTarifa(request.data['tipo_vehiculo'], request.data['tipo_residente'])
      caja = models.Caja.objects.get(estado=True)
    else:
      print(request.data[0])
      dataDict = models.Ticker.objects.get(id=request.data[0]['id'])
      isResidente = dataDict.isResidente
      idplaca = dataDict.no_placa.id
      tarifa = dataDict.tarifa.id
      caja = models.Caja.objects.get(estado=True)
    

    data = {'no_ticker': idticker, 'isResidente': isResidente, 'no_placa': idplaca, 'tarifa': tarifa, 'no_caja': str(caja.id)}
    serializer = serializers.TickerSerializer(data=data)
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
        try:
            vehiculo = models.Vehiculo.objects.get(no_placa=id)
            prueba2 = queryset.filter(no_placa=vehiculo.id)
            isParking = prueba2.filter(isParking=True)
            if len(isParking) != 0:
              queryset = isParking
            else:
              queryset = prueba2
        except :
          queryset = prueba
      else:
        isParking = prueba.filter(isParking=True)
        if len(isParking) != 0:
          queryset = isParking
        else:
          queryset = prueba
          
    
    return queryset


class CajaView(viewsets.ModelViewSet):

  serializer_class = serializers.CajaSerializer
  queryset = models.Caja.objects.all()

  def create(self, request):
    now = date.today()
    id = models.Caja.objects.all().count()+1
    idCaja = '{}{}{}{}'.format(now.day, now.month, now.year, id)

    data = {"id": int(idCaja),"estado": True, "monto": 0}
    serializer = serializers.CajaSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      res = {
        'created': True,
        'message': 'Caja creado correctamente',
        'caja': data
      }
      return Response(res, status=status.HTTP_200_OK)
    else:
      res = {
        'created': False,
        'error': 'No se creo la caja, verifique si hay otra caja abierta'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)
  
  def get_queryset(self):
    queryset = models.Caja.objects.all()
    estado = self.request.query_params.get('estado')
    
    if estado is not None:
      queryset = queryset.filter(estado=True)
    
    return queryset
  
  def update(self, request, *args, **kwargs):
    
    caja = self.get_object()
    data_caja = request.data
    print(data_caja)
    caja.monto = float(caja.monto) + float(data_caja['monto'])
    caja.estado = data_caja['estado']
    caja.save()
    serializer_class = serializers.CajaSerializer(caja)
    return Response(serializer_class.data)