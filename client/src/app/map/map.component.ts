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

  tracking = false;
  map: any;
  latitude = 52.1399718;
  longitude = 11.6503982;
  id: any;

  constructor() {}

  ngOnInit(): void {
    this.findMe();
    console.log([this.latitude, this.longitude]);
  }

  newMap(): void {
    // this.map = L.map('map', {
    //   center: [this.latitude, this.longitude],
    //   zoom: 13,
    // });
    this.map = L.map('map').setView([this.latitude, this.longitude], 13);

    // const OpenStreetMap_Mapnik = L.tileLayer(
    //   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //   {
    //     maxZoom: 19,
    //     attribution:
    //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //   }
    // );
    // OpenStreetMap_Mapnik.addTo(this.map);

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

    L.marker([this.latitude, this.longitude]).addTo(this.map);
    console.log([this.latitude, this.longitude]);

    L.circle([this.latitude, this.longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 200,
    }).addTo(this.map);
  }

  showPosition(position: any) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log([this.latitude, this.longitude]);
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.dir(position);
        this.showPosition(position);
        // this.showPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  enbleTracking() {
    if (navigator.geolocation) {
      this.tracking = true;
      navigator.geolocation.watchPosition((position) => {
        console.dir(position);
        this.showPosition(position);
      });
    }
  }

  disableTracking() {
    if (navigator.geolocation) {
      this.tracking = false;
      // navigator.geolocation.clearWatch(this.map);
    }
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

  ngAfterViewInit() {
    this.newMap();
  }
}
