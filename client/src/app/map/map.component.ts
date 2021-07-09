import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') gmapElement: any;

  locationAccess = true;
  permissionState: string = 'denied';
  map: any;
  latitude: any;
  longitude: any;
  id: any;

  constructor() {}

  ngOnInit(): void {
    this.findMe();
    this.handlePermission();
    console.log([this.latitude, this.longitude]);
  }

  newMap(): void {
    // seting up the map
    this.map = L.map('map');
    // this.map = L.map('map').setView([this.latitude, this.longitude], 13);

    // Setting for using the default marker icon
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    Marker.prototype.options.icon = iconDefault;

    // tileLayers
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1Ijoib21vYm9sYWppLWtveWkiLCJhIjoiY2txZm5weHFxMXJsajJ1b3ZhMjM1eWdkaCJ9.OpqdDwLtyeJdGpAiQFItUQ',
      }
    ).addTo(this.map);

    // custom fontawesome icon used as marker-icon
    const fontAwesomeIcon = L.divIcon({
      html: '<i class="fas fa-university fa-3x"></i>',
      iconSize: [20, 20],
      className: 'myDivIcon',
    });

    // icons with different colors
    // other icon colors possible are blue, gold, orange, yellow, grey and black
    //To create a new icon color, replace the color in iconUrl with one of the listed colors above
    var greenIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var redIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var violetIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // marker for Otto-von-Guericke University Magdeburg
    let OVGUmarker = L.marker([52.14008712768555, 11.643962860107422], {
      icon: fontAwesomeIcon,
    }).addTo(this.map);
    OVGUmarker.bindPopup('Otto-von-Guericke Universität').openPopup();
    var ovguPopup = L.popup()
      .setLatLng([52.14008712768555, 11.643962860107422])
      .setContent('OVGU')
      .openOn(this.map);

    // marker for Hochschule Magdeburg-Stendal
    let marker = L.marker([52.1401298, 11.6757769], {
      icon: fontAwesomeIcon,
    }).addTo(this.map);
    marker.bindPopup('Hochschule Magdeburg-Stendal').openPopup();

    // for tracking live location by setting watch to true and setting the view to the location of the user
    const onLocationFound = (e: any) => {
      this.latitude = e.latlng.lat;
      this.latitude = e.latlng.lng;
      console.log(this.latitude);
      var radius = e.accuracy / 2;
      var marker = L.marker(e.latlng, { icon: redIcon })
        .addTo(this.map)
        .bindPopup(`You are within ${radius} meter from this point`)
        .openPopup();
      L.circle(e.latlng, radius).addTo(this.map);
    };

    this.map.on('locationfound', onLocationFound);
    this.map.locate({ setView: true, watch: true, maxZoom: 16 });

    //Creating a circle
    // L.circle([this.latitude, this.longitude], {
    //   color: 'red',
    //   fillColor: '#f03',
    //   fillOpacity: 0.5,
    //   radius: 200,
    // }).addTo(this.map);

    // Using click event to get Latitude and Longitude values from the map
    const popup = L.popup();
    const onMapClick = (e: any) => {
      popup.setLatLng(e.latlng).setContent(`${e.latlng}`).openOn(this.map);
    };
    this.map.on('click', onMapClick);

    // Layer Groups

    let littleton = L.marker([52.144658, 11.64302]).bindPopup('NordPark'),
      denver = L.marker([52.130449, 11.626732]).bindPopup('Magdeburg Hbf'),
      aurora = L.marker([52.020406, 11.736177]).bindPopup('Schoenebeck'),
      golden = L.marker([52.42411, 10.780532]).bindPopup('Wolfsburg');

    var cities = L.layerGroup([littleton, denver, aurora, golden]).addTo(
      this.map
    );
  }

  // showPosition(position: any) {
  //   this.latitude = position.coords.latitude;
  //   this.longitude = position.coords.longitude;
  //   console.log([this.latitude, this.longitude]);
  // }

  findMe() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.dir(position);
    //     this.showPosition(position);
    //     // this.showPosition(position);
    //   });
    // } else {
    //   alert('Geolocation is not supported by this browser.');
    // }
  }

  enableTracking(event: any) {
    // if (this.permissionState == 'granted' && this.locationAccess) {
    //   console.log(this.locationAccess);
    //   navigator.permissions.query({ name: 'geolocation' }).then((result) => {
    //     console.log(result.state);
    //     this.permissionState = result.state;
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       console.log(position);
    //     });
    //   });

    //   console.log(this.permissionState);
    // }
    // window.location.reload();
    this.locationAccess = true;
    console.log(this.locationAccess);
  }

  disableTracking(event: any) {
    if (this.permissionState == 'denied' && !this.locationAccess) {
    }
    // window.location.reload();
    this.locationAccess = false;
    console.log(this.locationAccess);
  }

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: [39.8282, -98.5795],
  //     zoom: 3,
  //   });

  //   const tiles = L.tileLayer(
  //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     {
  //       maxZoom: 18,
  //       minZoom: 3,
  //       attribution:
  //         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //     }
  //   );

  //   tiles.addTo(this.map);
  // }

  handlePermission() {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      console.log(result);
      if (result.state == 'granted') {
        this.permissionState = result.state;
        console.log(this.permissionState);
      } else if (result.state == 'prompt') {
        console.log(this.permissionState);
      } else if (result.state == 'denied') {
        this.permissionState = result.state;
        console.log(this.permissionState);
      }
      result.onchange = function () {
        console.log(result);
      };
    });
  }

  // report(state: any) {
  //   console.log(`Permission ${state}`);
  // }
  // revokePermission() {
  //   navigator.permissions
  //     .revoke({ name: 'geolocation' })
  //     .then((result: any) => {
  //       console.log(result);
  //     });
  // }

  ngAfterViewInit() {
    this.newMap();
  }
}
