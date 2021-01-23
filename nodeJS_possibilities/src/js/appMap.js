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



const mapAndContents = document.getElementById('map_and_contents')

let container
let closer
let content

geodjangoMap.on('singleclick', () => {
	
	// Elements that will form a pop-up
  container = document.createElement("DIV")
  container.setAttribute("class", "ol-popup");
  container.setAttribute("id", "popup");
  mapAndContents.appendChild(container)
	
	closer = document.createElement("A")
  closer.setAttribute("class", "ol-popup-closer");
  closer.setAttribute("id", "popup-closer");
  container.appendChild(closer)
	
	content = document.createElement("DIV")
  content.setAttribute("id", "popup-content");
  container.appendChild(content)
})

const btnRegionCloser = document.getElementById('btn-region-closer')
const btnOfficeCloser = document.getElementById('btn-office-closer')


// Regions selection options
const regionSingleClick = new Select({
  layers: [kenyaRegionsLayer]
}) //By default, this is module:ol/events/condition~singleClick. Other defaults (except layers) are exactly what I need

// If region is selected get feature info, don't otherwise
const bringRegionPopupInfo = theFeature => {
	let regionFeatureName = theFeature.get('region')
	
	geodjangoMap.on('singleclick', evt => {
	let coordinates = evt.coordinate
	content.innerHTML = `
	<h3 class="text-center m-0">${regionFeatureName}</h3>
	<ul class="nav justify-content-center m-0">
		<li class="nav-item">
			<button id="btn-region-closer" type="button" class="btn btn-outline-primary p-0"><a class="nav-link" href="#">Region Information</a></button>
		</li>
	</ul>
	`
	theOverlay.setPosition(coordinates);
})
}

geodjangoMap.addInteraction(regionSingleClick)
regionSingleClick.on('select', elem => {
	// While at it, get its attributes
	bringRegionPopupInfo(elem.target)
})


// Offices selection options
const officesSingleClick = new Select({
  layers: [kenyaOfficesLayer]
}) //By default, this is module:ol/events/condition~singleClick. Other defaults (except layers) are exactly what I need

// If office is selected get feature info, don't otherwise
const bringOfficePopupInfo = theFeature => {
	let officeFeatureName = theFeature.get('name')
	
	geodjangoMap.on('singleclick', evt => {
		let coordinates = evt.coordinate
		content.innerHTML = `
		<h3 class="text-center m-0">${officeFeatureName}</h3>
		<ul class="nav justify-content-center m-0">
			<li class="nav-item">
				<button id="btn-office-closer" type="button" class="btn btn-outline-primary p-0"><a class="nav-link" href="#">Office Information</a></button>
			</li>
		</ul>
		`
		theOverlay.setPosition(coordinates);
	})
}

geodjangoMap.addInteraction(officesSingleClick)
officesSingleClick.on('select', elem => {
	// While at it, get its attributes
	bringOfficePopupInfo(elem.target)
})

if (btnOfficeCloser) {
  btnOfficeCloser.addEventListener('click', () => {
    theOverlay.setPosition(undefined)
    btnOfficeCloser.blur()
    return false
  })
}

if (btnRegionCloser){
    btnRegionCloser.addEventListener('click', () => {
    theOverlay.setPosition(undefined)
    btnRegionCloser.blur()
    return false
  })
}

if (closer){
  closer.addEventListener('click', () => {
  theOverlay.setPosition(undefined)
  closer.blur()
  return false
  })
}

sync(geodjangoMap);




























