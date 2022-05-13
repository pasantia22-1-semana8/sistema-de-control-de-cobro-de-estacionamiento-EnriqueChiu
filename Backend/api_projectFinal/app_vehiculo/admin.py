from django.contrib import admin

from app_vehiculo import models

admin.site.register(models.Tipo_vehiculo)
admin.site.register(models.Tipo_residente)
admin.site.register(models.Vehiculo)
