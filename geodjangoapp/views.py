from django.shortcuts import get_object_or_404, render
import os

from .models import (
    Issue,
    Office,
    Employee,
    Region
    )

from django.contrib.gis.gdal import OGRGeometry
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.gdal import DataSource
from django.contrib.gis.measure import Area

from django.core.serializers import serialize


# Create your views here.
def home_page(request):

    pagename = 'Home'

    issues = Issue.objects.all()
    employees = Employee.objects.all()
    offices = Office.objects.all()
    offices_json = serialize('geojson', offices)
    regions = Region.objects.all()
    regions_json = serialize('geojson', regions)

    context = {
        'pageName': pagename,
        'issues': issues,
        'offices': offices,
        'employees': employees,
        'regions': regions,
        'officeName': 'Head Office',
        'offices_json': offices_json,
        'regions_json': regions_json
    }

    return render(request,'geodjangoapp/home.html', context)


def offices_page(request):

    pagename = 'Offices'
    offices = Office.objects.all()

    context = {
        'pageName': pagename,
        'offices': offices
    }

    return render(request,'geodjangoapp/officespage.html', context)


def office_detail_page(request, office_id):

    pagename = 'Office Info'
    office = get_object_or_404(Office, pk=office_id)
    employees = Employee.objects.all().filter(office=office)
    issues = Issue.objects.all()

    context = {
        'pageName': pagename,
        'office': office,
        'employees': employees,
        'issues': issues
    }

    return render(request,'geodjangoapp/officedetail.html', context)


def regionaloffices_page(request):

    pagename = 'Regional Offices'
    offices = Office.objects.all().filter(category='regional')
    regions = Region.objects.all()

    context = {
        'pageName': pagename,
        'offices': offices,
    }

    return render(request,'geodjangoapp/regionaloffices.html', context)


def fieldoffices_page(request):

    pagename = 'Field Offices'
    offices = Office.objects.all().filter(category='field')
    regions = Region.objects.all()

    context = {
        'pageName': pagename,
        'offices': offices,
    }

    return render(request,'geodjangoapp/fieldoffices.html', context)


# pathRegions = os.path.join(os.getcwd(), 'geodjangoapp', 'appassets', 'KenyaRegions.geojson')
# regionsDS = DataSource(pathRegions)
# regions_layer = regionsDS[0]

def regions_view(request):

    pagename = 'Regions'
    regions = Region.objects.all()
    
    context = {
        'pageName': pagename,
        'regions': regions
    }

    return render(request,'geodjangoapp/kenyaregions.html', context)


def region_detail_view(request, regId):

    region = get_object_or_404(Region, pk=regId)
    pagename = region.region
    region_geom = region.geom
    region_wkt = region_geom.wkt
    regionOGR = OGRGeometry(region_wkt)

    alloffices = Office.objects.all()
    offices_in_region = []
    for office in alloffices:
        print(office.id)
        officeOGR = OGRGeometry(office.geom.wkt)
        if (regionOGR.intersects(officeOGR)):
            offices_in_region.append(office)

    
    area_sq_km = Area(sq_km=region_geom.area)

    context = {
        'pageName': pagename,
        'region': region,
        'area_sq_km': area_sq_km,
        'offices_in_region': offices_in_region
    }

    return render(request,'geodjangoapp/regiondetail.html', context)



def employees_view(request):
    
    pagename = 'Employees'
    employees = Employee.objects.all()
    
    context = {
        'pagename': pagename,
        'employees': employees
    }

    return render(request,'geodjangoapp/employeespage.html', context)



def employee_detail_view(request, employee_id):
    
    employee = get_object_or_404(Employee, pk=employee_id)
    pagename = employee.name
    
    context = {
        'pagename': pagename,
        'employee': employee,
    }

    return render(request,'geodjangoapp/employeedetail.html', context)