from django.db import models
from django.contrib.auth.models import AbstractUser



class Rol(models.Model):
  nombre = models.CharField(max_length=255, unique=True)
  descripcion = models.CharField(max_length=255, null=True)

  def __str__(self):
    return self.nombre


class Profile(AbstractUser):
  rol = models.ForeignKey(Rol, on_delete=models.CASCADE, null=True)
