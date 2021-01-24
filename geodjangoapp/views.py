from django.shortcuts import get_object_or_404, render

from .models import Issue, Office, Employee, Region

from django.contrib.gis.gdal import OGRGeometry

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
    regions = Region.objects.all()


    officeWKT = office.geom.wkt
    officeGEOM = OGRGeometry(officeWKT)

    context = {
        'pageName': pagename,
        'office': office,
        'employees': employees
    }

    return render(request,'geodjangoapp/officedetail.html', context)