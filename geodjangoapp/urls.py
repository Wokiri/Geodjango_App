from django.urls import path

from .views import (
    home_page,
    offices_page,
    office_detail_page
    )

app_name = 'geodjangoapp'

urlpatterns = [
    path('', home_page, name='homepage'),
    path('offices/', offices_page, name='officespage'),
    path('office/<int:office_id>/', office_detail_page, name='officedetailpage'),
]