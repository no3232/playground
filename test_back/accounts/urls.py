from django.urls import path
from . import views


urlpatterns = [
    # path('phonecheck/', views.filtering_phone),
    path('emailcheck/', views.filtering_email),
    path('emailvalidate/', views.validate_email),
    path('social_login/<str:social_page>/', views.social_login),
    path('join/<int:user_pk>/', views.join_views),
    path('image_test/', views.image_test),
    path('testlogin/', views.testlogin),
    path('testrefresh/', views.testrefresh),
    path('goto401/', views.goto401),
]