from django.contrib.gis.db import models
from django.utils import timezone


class Issue(models.Model):

    Sector_Choices = (
        ('health', 'Health'),
        ('education', 'Education'),
        ('environment', 'Environment'),
    )

    Progress_Status = (
        ('pending', 'Project Pending'),
        ('ongoing', 'Project Ongoing'),
        ('finished', 'Project Finished'),
    )

    sector = models.CharField(max_length=20, choices=Sector_Choices)
    title = models.CharField(max_length=100)
    description = models.TextField()
    project_start = models.DateField(blank=True, null=True)
    project_end = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ('project_start', 'title',)

    def project_progress(self):
        date_today = timezone.now()
        if self.project_start < date_today:
            return 'pending'
        elif self.project_end > date_today:
            return 'finished'
        else:
            return 'ongoing'
    
    def __str__(self):
        return self.title
    


class Office(models.Model):

    Office_Category = (
        ('field', 'Field Office'),
        ('regional', 'Regional Office'),
        ('head', 'Head Office'),
    )

    category = models.CharField(default='field', max_length=20, choices=Office_Category)
    issue = models.ManyToManyField(Issue, blank=True)
    name = models.CharField(max_length=100)
    geom = models.MultiPointField(srid=4326)
    
    def __str__(self):
        return self.name


class Employee(models.Model):
    name = models.CharField(max_length=100)
    office = models.ForeignKey(Office, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Region(models.Model):
    id = models.IntegerField(primary_key=True)
    region = models.CharField(max_length=80)
    geom = models.MultiPolygonField(srid=4326)

    def __str__(self):
        return self.region
