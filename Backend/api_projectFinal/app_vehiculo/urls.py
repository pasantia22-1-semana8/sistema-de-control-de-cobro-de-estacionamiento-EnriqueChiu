from app_vehiculo import views
from django.urls import path

from django.db import router
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tipoVehiculo', views.Tipo_vehiculoView)
router.register(r'tipoResidente', views.Tipo_residenteView)
router.register(r'vehiculo', views.VehiculoView)
urlpatterns = router.urls

'''
urlpatterns = [
  path('createTipoVehiculo/', views.Tipo_vehiculoView.as_view())
]'''