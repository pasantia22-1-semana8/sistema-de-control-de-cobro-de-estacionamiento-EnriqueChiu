from user import views
from django.urls import path


from django.db import router
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'createRol', views.RolView)
urlpatterns = router.urls

urlpatterns += [
  path('login/', views.LoginView.as_view()),
  path('register/', views.RegisterView.as_view()),
]