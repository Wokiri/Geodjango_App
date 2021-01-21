from django.shortcuts import render

from .models import Issue, Office, Employee, Region

# Create your views here.
def home_page(request):

    pagename = 'Home'

    context = {
        'pageName': pagename,
        'issues': Issue.objects.all(),
        'offices': Office.objects.all(),
        'employees': Employee.objects.all(),
        'region': Region.objects.all()
    }

    return render(request,'geodjangoapp/home.html', context)