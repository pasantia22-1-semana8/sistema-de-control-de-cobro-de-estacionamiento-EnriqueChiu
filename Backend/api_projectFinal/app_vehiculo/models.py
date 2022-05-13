from django.db import models

class Tipo_vehiculo(models.Model):
  nombre = models.CharField(max_length=255, unique=True)
  descripcion = models.CharField(max_length=255)
  estado = models.BooleanField(default=True)

  def __str__(self):
    return self.nombre


class Tipo_residente(models.Model):
  nombre = models.CharField(max_length=255, unique=True)
  descripcion = models.CharField(max_length=255)
  estado = models.BooleanField(default=True)

  def __str__(self):
    return self.nombre


class Vehiculo(models.Model):
  no_placa = models.CharField(max_length=50, unique=True)
  estado = models.BooleanField(default=True)
  descripcion = models.CharField(max_length=255)
  tipo_vehiculo = models.ForeignKey(Tipo_vehiculo, on_delete=models.CASCADE, related_name='tipo1')
  tipo_residente = models.ForeignKey(Tipo_residente, on_delete=models.CASCADE, related_name='tipo2')
  
  def __str__(self):
    return self.no_placa