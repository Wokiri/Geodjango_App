from django.urls import path

from .views import (
    home_page,
    offices_page
    )

app_name = 'geodjangoapp'

urlpatterns = [
    path('', home_page, name='homepage'),
    path('offices/', offices_page, name='officesinfo'),
]