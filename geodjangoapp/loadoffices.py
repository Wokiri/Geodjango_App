# Auto-generated `LayerMapping` dictionary for Region model

import os
from django.contrib.gis.utils import LayerMapping
from .models import Office

offices = os.path.join(os.getcwd(), 'geodjangoapp', 'appassets', 'Offices.geojson')

office_mapping = {
    'name': 'name',
    'geom': 'MULTIPOINT',
}

def run(verbose=True):
    layermap = LayerMapping(Office, offices, office_mapping, transform=False)
    layermap.save(strict=True, verbose=verbose)