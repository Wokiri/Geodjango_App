# Auto-generated `LayerMapping` dictionary for Region model

import os
from django.contrib.gis.utils import LayerMapping
from .models import Region

kenya_regions = os.path.join(os.getcwd(), 'geodjangoapp', 'appassets', 'KenyaRegions.geojson')

region_mapping = {
    'id': 'id',
    'region': 'Region',
    'geom': 'MULTIPOLYGON',
}

def run(verbose=True):
    layermap = LayerMapping(Region, kenya_regions, region_mapping, transform=False)
    layermap.save(strict=True, verbose=verbose)