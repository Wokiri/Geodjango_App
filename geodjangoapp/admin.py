from django.contrib.gis import admin

from .models import (
    Office,
    Issue,
    Employee
    )

@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin):
    list_display = ['name','category']
    list_filter = ['category']
    search_fields = ['name']


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ['title', 'sector', 'description', 'project_start', 'project_end']
    list_filter = ['sector', 'project_end']
    search_fields = ['title']
    ordering = ['project_start', 'title']



@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['name', 'office']
    list_filter = ['office']
    search_fields = ['name']
    ordering = ['office', 'name']

