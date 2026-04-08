"""
URL configuration for qrmenu_backend project.

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
from django.urls import path, include  # Make sure 'include' is imported here!
from api import views as api_views # Import your views here

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')), # This links the /api/ route to your app

    # Add this line to serve the index.html on the base domain!
    path('', api_views.serve_index, name='index'),
]
