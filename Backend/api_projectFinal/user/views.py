from rest_framework.views import Response, APIView
from rest_framework import viewsets
from rest_framework import status
from django.contrib.auth.models import User
from user import serializers, models

class RolView(viewsets.ModelViewSet):

  serializer_class = serializers.RolSerializer
  queryset = models.Rol.objects.all()

  def create(self, request):
    serializer = serializers.RolSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      res = {
        'created': True,
        'message': 'Rol creado correctamente'
      }
      return Response(res, status=status.HTTP_200_OK)
    else:
      res = {
        'created': False,
        'error': 'No se creo correctamente el rol, verifique si ingreso un rol ya existente o no lleno todos los campos'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)

  def destroy(self, request, *args, **kwargs):
    rol = self.get_object()
    rol.delete()
    return Response({"message": "Se elimino correctamente"})

class UserView(viewsets.ModelViewSet):

  serializer_class = serializers.UserModelSerializer
  queryset = models.Profile.objects.all()


  def destroy(self, request, *args, **kwargs):
    user = self.get_object()
    user.delete()
    return Response({"message": "Se elimino correctamente"})


class LoginView(APIView):

  def post(self, request):
    serializer = serializers.LoginSerializer(data=request.data)
    
    if serializer.is_valid():
      user, token = serializer.save()
      data = {
        'auth': True,
        'user': serializers.UserModelSerializer(user).data,
        'token': token
      }
      datauser = data['user']
      try:
        datauser['rol'] = '{}'.format(models.Rol.objects.filter(nombre=datauser['rol']).get())
      except:
        datauser['rol'] = 'admin'
      return Response(data, status=status.HTTP_200_OK)
    else:
      res = {
        'auth': False,
        'error': 'Credenciales Invalido'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):

  def post(self, request):
    serializer =  serializers.RegisterSerializer(data=request.data)
    if serializer.is_valid():
      data = {
        'created': True,
        'message': 'Se creo correctamente el usuario'
      }
      return Response(data, status=status.HTTP_200_OK)
    else:
      res = {
        'created': False,
        'error': 'Error al crear el usuario,  revise si ingreso un username repetido.'
      }
      return Response(res, status=status.HTTP_400_BAD_REQUEST)