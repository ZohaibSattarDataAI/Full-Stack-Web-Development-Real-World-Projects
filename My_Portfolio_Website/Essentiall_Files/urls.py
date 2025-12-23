"""
URL configuration for Hi_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Hi_backend import views

urlpatterns = [
    path('myadmin/', admin.site.urls),
    path('', views.Home, name="Home"),
    path('About/', views.About, name="About"),
    path('Skills/', views.Skills, name="Skill"),
    path('Contact_us/', views.Contact, name="Contact_us"),
    path('Projects/', views.Projects, name="Projects"),  
    path('Hire/', views.Hire, name="Hire"),   # homepage using portfolioHome.html
]