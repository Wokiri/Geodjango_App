from django.urls import path

from .views import (
    home_page,
    offices_page,
    office_detail_page,
    regionaloffices_page,
    fieldoffices_page,
    regions_view,
    region_detail_view,
    employees_view,
    employee_detail_view
    )

app_name = 'geodjangoapp'

urlpatterns = [
    path('', home_page, name='homepage'),
    path('offices/', offices_page, name='officespage'),
    path('office/<int:office_id>/', office_detail_page, name='officedetailpage'),
    path('office/regionaloffices/', regionaloffices_page, name='regionalspage'),
    path('office/fieldoffices/', fieldoffices_page, name='fieldspage'),
    path('kenyaregions/', regions_view, name='regionspage'),
    path('kenyaregion/<int:regId>/', region_detail_view, name='regiondetailpage'),
    path('employees/', employees_view, name='employeespage'),
    path('employee/<int:employee_id>/', employee_detail_view, name='employeedetailpage'),
]