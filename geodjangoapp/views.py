from django.shortcuts import render

from .models import Issue, Office, Employee, Region

# Create your views here.
def home_page(request):

    pagename = 'Home'

    issues = Issue.objects.all()
    employees = Employee.objects.all()
    offices = Office.objects.all()
    regions = Region.objects.all()

    context = {
        'pageName': pagename,
        'issues': issues,
        'offices': offices,
        'employees': employees,
        'regions': regions,
        'officeName': 'Head Office'
    }

    return render(request,'geodjangoapp/home.html', context)


def offices_page(request):

    pagename = 'Offices'

    context = {
        'pageName': pagename,
    }

    return render(request,'geodjangoapp/officesinfo.html', context)