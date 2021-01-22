import 'ol/ol.css';
import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import sync from 'ol-hashed';
import { Style, Fill, Text, Stroke } from 'ol/style';
import { click } from 'ol/events/condition'


const a = {
"type": "FeatureCollection",
"name": "Offices",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "name": "Wajir" }, "geometry": { "type": "Point", "coordinates": [ 40.0688889, 1.7472222 ] } },
{ "type": "Feature", "properties": { "name": "Busia" }, "geometry": { "type": "Point", "coordinates": [ 34.3052778, 0.3936111 ] } },
{ "type": "Feature", "properties": { "name": "Lodwar" }, "geometry": { "type": "Point", "coordinates": [ 35.6, 3.1166667 ] } },
{ "type": "Feature", "properties": { "name": "Narok" }, "geometry": { "type": "Point", "coordinates": [ 35.8666667, -1.0833333 ] } },
{ "type": "Feature", "properties": { "name": "Nyeri" }, "geometry": { "type": "Point", "coordinates": [ 36.95, -0.4166667 ] } },
{ "type": "Feature", "properties": { "name": "Marsabit" }, "geometry": { "type": "Point", "coordinates": [ 37.9833333, 2.3333333 ] } },
{ "type": "Feature", "properties": { "name": "Lamu" }, "geometry": { "type": "Point", "coordinates": [ 40.9033333, -2.2783333 ] } },
{ "type": "Feature", "properties": { "name": "Makueni" }, "geometry": { "type": "Point", "coordinates": [ 37.6166667, -1.8 ] } },
{ "type": "Feature", "properties": { "name": "Voi" }, "geometry": { "type": "Point", "coordinates": [ 38.5666667, -3.3833333 ] } },
{ "type": "Feature", "properties": { "name": "Kisumu" }, "geometry": { "type": "Point", "coordinates": [ 34.75, -0.1 ] } },
{ "type": "Feature", "properties": { "name": "Mombasa" }, "geometry": { "type": "Point", "coordinates": [ 39.6666667, -4.05 ] } },
{ "type": "Feature", "properties": { "name": "Thika" }, "geometry": { "type": "Point", "coordinates": [ 37.0833333, -1.05 ] } },
{ "type": "Feature", "properties": { "name": "Nairobi" }, "geometry": { "type": "Point", "coordinates": [ 36.8166667, -1.2833333 ] } }
]
}

const kenyaRegionsJson = '{{ regions_json }}'
const kenyaOffices = '{{ offices_json }}'

const kenyaRegions = new VectorSource({
  features: new GeoJSON().readFeatures(a, {
      // dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
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
      color: 'rgba(0, 110, 81, 1)'
    }),
    stroke: new Stroke({
      color: 'rgb(0, 255, 187)',
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
    zoom: 2
  })
});

sync(geodjangoMap);
