/*Main script */

import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

var json_data = null;
var overlay = null;
var map = null;
var heatmap = null;
var scatterplot = null;


function initialize(query=null){

  if (query) {
      var link = window.location.href + 'getdata?' + query;
  } else {
      var link = window.location.href + 'getdata';
  }
  console.log("Using url" + link);
  $.ajax({
    type: 'GET',
    url: link,
    dataType : 'json',   //you may use jsonp for cross origin request
    async: false,
    crossDomain:true,
    success: function(response) { 
      console.log('Data loaded');
     json_data = response;
    },
    error: function(xhr, status, err) {
      console.log('data load failed');
      console.log(xhr.responseText);
    }
   });
  
  
   scatterplot = () => new ScatterplotLayer({
      id: 'scatter',
      data: json_data,
      opacity: 0.8,
      filled: true,
      radiusMinPixels: 2,
      radiusMaxPixels: 5,
      getPosition: d => [d.longitude, d.latitude],
      getFillColor: d => d.decibel<60 ? [0,128,0] : d.decibel < 80 ? [252,232,2] : d.decibel < 110 ? [252,144,3] : [252,3,3] ,
      pickable: true,
      onHover: ({object,x,y}) => {
          const el = document.getElementById('tooltip');
          if (object) {
              const { decibel, id, date, latitude, longitude } = object;
              const  emj = decibel <60 ? "<i class=\"em em-slightly_smiling_face\" aria-role=\"presentation\" aria-label=\"SLIGHTLY SMILING FACE\"></i>" : decibel < 80 ? "<i class=\"em em-sweat\" aria-role=\"presentation\" aria-label=\"FACE WITH COLD SWEAT\"></i>" : decibel < 110 ? "<i class=\"em em-face_with_head_bandage\" aria-role=\"presentation\" aria-label=\"FACE WITH HEAD-BANDAGE\"></i>" : "<i class=\"em em-skull\" aria-role=\"presentation\" aria-label=\"SKULL\"></i>"
              el.innerHTML = `<span class="top"> <h3>Measurement</h3><ul><li>ID : ${id}</li><li>Noise Level: ${decibel}dB ${emj}</li><li>Date: ${date}</li></ul><hr>Lat : ${latitude} , Long : ${longitude} </span>`
              el.style.display = 'block';
              el.style.position = 'absolute';
              el.style.width = '240px';
              el.style.backgroundColor = 'black';
              el.style.padding = '20px';
              el.style.textAlign = 'left';
              el.style.fontFamily = 'Trebuchet MS';
              el.style.listStyleType = 'circle';
              el.style.color = 'white';
              el.style.borderRadius = '3px';
              el.style.opacity = 0.9;
              el.style.left = x + 'px';
              el.style.top = y + 'px';
          } else {
              el.style.opacity = 0.0;
          }
      },
      onClick: ({object,x,y}) => {
          window.open(`tisurldoesnotexist`);
      } 
  });
  
  
  window.initMap = () => {
      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.29705919479263, lng: -121.81741295},
          zoom: 10,
          styles: [
              {
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#212121"
                  }
                ]
              },
              {
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#212121"
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#9e9e9e"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#bdbdbd"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "poi.business",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#181818"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#616161"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1b1b1b"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#2c2c2c"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#8a8a8a"
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#373737"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#3c3c3c"
                  }
                ]
              },
              {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#4e4e4e"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#616161"
                  }
                ]
              },
              {
                "featureType": "transit",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#000000"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#3d3d3d"
                  }
                ]
              }
            ]
      });
  
       heatmap = () => new HeatmapLayer({
          id: 'heat',
          data: json_data,
          getPosition: d => [d.longitude, d.latitude],
          getWeight: d => d.decibel < 20 ? 0 : d.decibel < 40 ? d.decibel*0.1 : d.decibel < 60 ? d.decibel*0.2 : d.decibel < 80 ? d.decibel*0.4 : d.decibel < 100 ? d.decibel*0.6 : d.decibel < 120 ? d.decibel*0.8 : d.decibel*1 ,
          radiusPizels: 60,
          pickable: true,
          colorRange: [[0, 125, 8],[113, 237, 5],[245, 237, 2],[245, 99, 2],[255, 19, 3]],
          onHover: ({object,x,y}) => {
          const el = document.getElementById('tooltip');
          if (object) {
              const { decibel, id, date, latitude, longitude } = object;
              const  emj = decibel <60 ? "<i class=\"em em-slightly_smiling_face\" aria-role=\"presentation\" aria-label=\"SLIGHTLY SMILING FACE\"></i>" : decibel < 80 ? "<i class=\"em em-sweat\" aria-role=\"presentation\" aria-label=\"FACE WITH COLD SWEAT\"></i>" : decibel < 110 ? "<i class=\"em em-face_with_head_bandage\" aria-role=\"presentation\" aria-label=\"FACE WITH HEAD-BANDAGE\"></i>" : "<i class=\"em em-skull\" aria-role=\"presentation\" aria-label=\"SKULL\"></i>"
              el.innerHTML = `<span class="top"> <h3>Measurement</h3><ul><li>ID : ${id}</li><li>Noise Level: ${decibel}dB ${emj}</li><li>Date: ${date}</li></ul><hr>Lat : ${latitude} , Long : ${longitude} </span>`
              el.style.display = 'block';
              el.style.position = 'absolute';
              el.style.width = '240px';
              el.style.backgroundColor = 'black';
              el.style.padding = '20px';
              el.style.textAlign = 'left';
              el.style.fontFamily = 'Trebuchet MS';
              el.style.listStyleType = 'circle';
              el.style.color = 'white';
              el.style.borderRadius = '3px';
              el.style.opacity = 0.9;
              el.style.left = x + 'px';
              el.style.top = y + 'px';
          } else {
              el.style.opacity = 0.0;
          }
      },
      onClick: ({object,x,y}) => {
          window.open(`tisurldoesnotexist`);
      } 
      });
  
      overlay = new GoogleMapsOverlay({
          layers: [
              heatmap(),
              scatterplot(),
          ]
      });
      overlay.setMap(map);
  
  
      var icons = {
        faint: {
          name: 'Faint',
          icon: '40dB'
        },
        moderate: {
          name: 'Moderate',
          icon: '60dB'
        },
        loud: {
          name: 'Loud',
          icon: '70dB'
        },
        veryloud: {
          name: 'Very Loud',
          icon: '80dB'
        },
        extreme: {
          name: 'Extremely Loud',
          icon: '110dB'
        },
        pain: {
          name: 'Painful Acoustic Trauma',
          icon: '140dB'
        }
      };
  
      var legend = document.getElementById('legend');
          for (var key in icons) {
            var type = icons[key];
            var name = type.name;
            var icon = type.icon;
            var div = document.createElement('div');
            div.innerHTML = icon + ' - ' + name;
            legend.appendChild(div);
          }
  
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
        
          //ReactDOM.render(Overlay, document.getElementById('controls'));
  
  }
}


window.updateMap = (parameter) => {
  console.log('Parameter : '+ parameter);
  window.initMap;
  overlay.setMap(null);
    if (parameter === 'scatter'){
      overlay = new GoogleMapsOverlay({
        layers: [
            scatterplot(),
        ]
    });
    overlay.setMap(map);
    //window.updateMap(map);
    console.log("Updated map");
    } else {
      overlay = new GoogleMapsOverlay({
        layers: [
            heatmap(),
        ]
    });
    overlay.setMap(map);
    //window.updateMap(map);
    console.log("Updated map");
    }   
}

window.filterMap = () => {
  console.log("Filtering map");
  const date1 = document.getElementById("date1").value;
  const date2 = document.getElementById("date2").value;
  console.log ("Filtering between dates : " + date1 + " and " + date2);
  var query = ""
  if (date1) {
    query = "date1="+date1;
    if (date2) {
      query = query + "&date2="+date2;
    }
  }
  if (query){
    initialize(query);
    updateMap('scatter');
    console.log("Filtered map");
  }
}




initialize();