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

    context = {
        'pageName': pagename,
        'office': office,
        'employees': employees
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


pathRegions = os.path.join(os.getcwd(), 'geodjangoapp', 'appassets', 'KenyaRegions.geojson')
regionsDS = DataSource(pathRegions)
regions_layer = regionsDS[0]

def regions_view(request):
    pagename = 'Regions'
    num_features = len(regions_layer)

    the_regions = []
    for layer in regions_layer:
        the_regions.append(f"{layer.get('id')}. {layer.get('Region')}")

    context = {
        'pageName': pagename,
        'num_features': num_features,
        'the_regions': the_regions
    }

    return render(request,'geodjangoapp/kenyaregions.html', context)


def region_detail_view(request, reg_id):

    the_region = ''
    for layer in regions_layer:
        the_region = layer.get('Region')

    pagename = 'Regions Detail'
    context = {
        'pageName': pagename,
        'the_regions': the_region
    }

    return render(request,'geodjangoapp/kenyaregions.html', context)