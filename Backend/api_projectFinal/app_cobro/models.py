from django.db import models
from app_vehiculo.models import Tipo_residente
from app_vehiculo.models import Tipo_vehiculo
from app_vehiculo.models import Vehiculo


class Tarifa(models.Model):
  tipo_vehiculo = models.ForeignKey(Tipo_vehiculo, on_delete=models.CASCADE, related_name='saldo_tipo1')
  tipo_residente = models.ForeignKey(Tipo_residente, on_delete=models.CASCADE, related_name='saldo_tipo2')
  tarifa = models.DecimalField(decimal_places=2, max_digits=10)
  descripcion = models.CharField(max_length=255)

  def __str__(self):
    return '{}'.format(self.tarifa)


class Caja(models.Model):
  id = models.IntegerField(unique=True, primary_key=True)
  estado = models.BooleanField(default=True)
  monto = models.DecimalField(decimal_places=2, max_digits=10)

  def __str__(self):
    return '{}'.format(self.id)

class Ticker(models.Model):
  no_placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE, related_name='ticker')
  no_ticker = models.CharField(max_length=255, unique=True)
  isResidente = models.BooleanField(default=False)
  isParking = models.BooleanField(default=True)
  tarifa = models.ForeignKey(Tarifa, on_delete=models.CASCADE, related_name='no_ticker')
  no_caja = models.ForeignKey(Caja, on_delete=models.CASCADE)
  hora_input = models.DateTimeField(auto_now_add=True)
  hora_output = models.DateTimeField(auto_now=True)


  def __str__(self):
      return '{}'.format(self.id)