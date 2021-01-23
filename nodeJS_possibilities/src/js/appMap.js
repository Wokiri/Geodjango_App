import 'ol/ol.css';
import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import sync from 'ol-hashed';
import {
  Circle as CircleStyle,
  Style,
  Fill,
  Text,
  Stroke
} from 'ol/style';
import { click, singleClick } from 'ol/events/condition'
import Select from 'ol/interaction/Select'
import Overlay from 'ol/Overlay';

const kenyaRegionsJson = require('./KenyaRegions.json')
const kenyaOfficesJson = require('./Offices.json')

const container = document.getElementById('popup')
const content = document.getElementById('popup-content')
const closer = document.getElementById('popup-closer')

const kenyaRegions = new VectorSource({
  features: new GeoJSON().readFeatures(kenyaRegionsJson, {
      // dataProjection: 'EPSG:4326',
      // featureProjection: 'EPSG:3857',
      extractGeometryName: true
  })
})

const kenyaOffices = new VectorSource({
  features: new GeoJSON().readFeatures(kenyaOfficesJson, {
      // dataProjection: 'EPSG:4326',
      // featureProjection: 'EPSG:3857',
      extractGeometryName: true
  })
})

const map_container = document.querySelector('#map_container')

const regionsTextLabel = feature => `${feature.get('region')} Region`
const officesTextLabel = feature => `${feature.get('name')} Office`

const regionsTextStyle = feature => (
    new Text({
        textAlign: 'center',
        textBaseline: 'middle',
        font: `bold 14px "Trebuchet MS", Helvetica, sans-serif`,
        text: regionsTextLabel(feature),
        placement: 'polygon',
        fill: new Fill({
          color: 'rgb(40, 40, 164)'
        })
    })
)
const officesTextStyle = feature => {
  if (officesTextLabel(feature) === 'Nairobi Office'){
    return new Text({
      textAlign: 'center',
      textBaseline: 'middle',
      font: `bold 16px "Trebuchet MS", Helvetica, sans-serif`,
      text: (officesTextLabel(feature)).toUpperCase(),
      placement: 'point',
      offsetX: 0,
      offsetY:20,
      fill: new Fill({
        color: 'rgb(5, 80, 10)'
      })
    })
  }else if (officesTextLabel(feature) === 'Kisumu Office' || officesTextLabel(feature) === 'Thika Office' || officesTextLabel(feature) === 'Mombasa Office'){
    return new Text({
      textAlign: 'start',
      textBaseline: 'middle',
      font: `bold 14px "Trebuchet MS", Helvetica, sans-serif`,
      text: officesTextLabel(feature),
      placement: 'point',
      offsetX: 12,
      offsetY:0,
      fill: new Fill({
        color: 'rgb(13, 13, 38)'
      })
    })

  } else{
    return new Text({
      textAlign: 'start',
      textBaseline: 'middle',
      font: `bold 12px "Trebuchet MS", Helvetica, sans-serif`,
      text: officesTextLabel(feature),
      placement: 'point',
      offsetX: 10,
      offsetY: 0,
      fill: new Fill({
        color: 'rgb(255, 255, 255)'
      })
    })
  }
    
}

const regionsPolygonStyle = feature =>  {
  return new Style({
      fill: new Fill({
        color: 'rgba(140, 140, 217, 1)'
      }),
      stroke: new Stroke({
        color: 'rgb(20, 20, 82)',
        width: 1
      }),
      text: regionsTextStyle(feature)
    })
}


// Ofices style
const officesPointStyle = feature =>  {

  if (officesTextLabel(feature) === 'Nairobi Office'){
    return new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({color: 'rgba(40, 80, 80, 0.1)'}),
      stroke: new Stroke({color: 'rgb(40,80, 80)', width: 4}),
    }),
    text: officesTextStyle(feature)
  })

  }else if(officesTextLabel(feature) === 'Kisumu Office' || officesTextLabel(feature) === 'Thika Office' || officesTextLabel(feature) === 'Mombasa Office'){
    return new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({color: 'rgba(255, 255, 255, 1)'}),
      // stroke: new Stroke({color: 'rgb(80, 120, 120)', width: 3}),
    }),
    text: officesTextStyle(feature)
  })

  }else{
    return new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({color: 'rgba(40, 80, 80, 1)'}),
      stroke: new Stroke({color: 'rgb(200, 240, 240)', width: 2}),
    }),
    text: officesTextStyle(feature)
  })
  }
}

// regions layer
const kenyaRegionsLayer = new VectorLayer({
    source: kenyaRegions,
    style: regionsPolygonStyle
})

// offices layer
const kenyaOfficesLayer = new VectorLayer({
    source: kenyaOffices,
    style: officesPointStyle
})


const theOverlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
	  duration: 250
  }
});

const geodjangoMap = new Map({
  target: map_container,
  layers: [kenyaRegionsLayer, kenyaOfficesLayer],
  overlays: [theOverlay],
  view: new View({
    center: [36.8166667, -1.2833333],
    zoom: 25
  })
})


// Regions selection options
const singleMapClick = new Select({}) //By default, this is module:ol/events/condition~singleClick. Other defaults are exactly what I need

// If region is selected get feature info, don't otherwise
const bringLayerPopupInfo = theFeature => {
	
	geodjangoMap.on('singleclick', evt => {

  let featureName = theFeature.get('Region')
  if (!featureName) featureName = theFeature.get('name')

	let coordinates = evt.coordinate
	content.innerHTML = `
	<h3 class="text-center m-0">${featureName}</h3>
	<ul class="nav justify-content-center m-0">
		<li class="nav-item">
			<button id="btn-layer-closer" type="button" class="btn btn-outline-primary p-0"><a class="nav-link" href="#">Region Information</a></button>
		</li>
	</ul>
  `
  const btnLayerCloser = document.getElementById('btn-layer-closer')
  theOverlay.setPosition(coordinates);

  btnLayerCloser.addEventListener('click', () => {
  theOverlay.setPosition(undefined)
  btnLayerCloser.blur()
  return false
  })
})
}

geodjangoMap.addInteraction(singleMapClick)
singleMapClick.once('select', elem => {
	// While at it, get its attributes
	bringLayerPopupInfo(elem.target)
})


if (closer){
  closer.addEventListener('click', () => {
  theOverlay.setPosition(undefined)
  closer.blur()
  return false
  })
}

sync(geodjangoMap);




























