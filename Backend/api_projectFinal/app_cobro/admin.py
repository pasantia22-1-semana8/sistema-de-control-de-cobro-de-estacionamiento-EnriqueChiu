from django.contrib import admin

from app_cobro import models

admin.site.register(models.Tipo_vehiculo)
admin.site.register(models.Tipo_residente)
admin.site.register(models.Tarifa)
admin.site.register(models.Vehiculo)
admin.site.register(models.Ticker)
admin.site.register(models.Caja)