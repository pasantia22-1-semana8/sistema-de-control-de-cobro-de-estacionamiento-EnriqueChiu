from user import views
from django.urls import path


from django.db import router
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'createRol', views.RolView)
router.register(r'list', views.UserView)
urlpatterns = router.urls

urlpatterns += [
  path('login/', views.LoginView.as_view()),
  path('register/', views.RegisterView.as_view()),
]