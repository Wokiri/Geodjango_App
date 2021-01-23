import 'ol/ol.css';
import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import sync from 'ol-hashed';
import { Style, Fill, Text, Stroke } from 'ol/style';
import { click } from 'ol/events/condition'


const kenyaRegions = new VectorSource({
  features: new GeoJSON().readFeatures(kenyaRegionsJson, {
      // dataProjection: 'EPSG:4326',
      // featureProjection: 'EPSG:3857',
      extractGeometryName: true
  })
})

const map_container = document.querySelector('#map_container')

const regionsTextLabel = feature => feature.get('Region')

const regionsTextStyle = feature => (
    new Text({
        textAlign: 'center',
        textBaseline: 'middle',
        font: "14px verdana, Calibri, sans-serif",
        text: regionsTextLabel(feature),
        placement: 'polygon',
        fill: new Fill({
            color: 'rgb(256, 256, 256)'
        })
    })
)

const regionsPolygonStyle = feature =>  {
  return new Style({
    fill: new Fill({
      color: 'rgba(214, 214, 245, 1)'
    }),
    stroke: new Stroke({
      color: 'rgb(20, 20, 82)',
      width: 1
    }),
    text: regionsTextStyle(feature)
  })
}

// timezones layer
const kenyaRegionsLayer = new VectorLayer({
    source: kenyaRegions,
    style: regionsPolygonStyle
})

const geodjangoMap = new Map({
  target: map_container,
  layers: [kenyaRegionsLayer],
  view: new View({
    center: [36.8166667, -1.2833333],
    zoom: 24
  })
});

sync(geodjangoMap);
