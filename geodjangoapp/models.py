from django.contrib.gis.db import models


class Issue(models.Model):

    Sector_Choices = (
        ('health', 'Health'),
        ('education', 'Education'),
        ('environment', 'Environment'),
    )

    sector = models.CharField(max_length=20, choices=Sector_Choices)
    title = models.CharField(max_length=100)
    description = models.TextField()
    start_time = 1
    end_time = 2

    Progress_Status = (
        ('pending', 'Project Pending'),
        ('ongoing', 'Project Ongoing'),
        ('finished', 'Project Finished'),
    )


class Office(models.Model):

    Office_Category = (
        ('field', 'Field Office'),
        ('regional', 'Regional Office'),
        ('head', 'Head Office'),
    )

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=Office_Category)
    issue = models.ManyToManyField(Issue)
    


class Employee(models.Model):
    name = models.CharField(max_length=100)
    office = models.ForeignKey(Office, on_delete=models.CASCADE)


class Region(models.Model):
    name = models.CharField(max_length=100)

