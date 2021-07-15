import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { icon, Marker } from 'leaflet';
import 'leaflet-routing-machine';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  // @ViewChild('map') gmapElement: any;

  locationAccess = true;
  permissionState: string = 'denied';
  map: any;
  latitude: any;
  longitude: any;
  id: any;
  address: any = '';
  ArrayOfAddress: any = '';

  constructor() {}

  ngOnInit(): void {
    this.handlePermission();
    console.log([this.latitude, this.longitude]);
    console.log(this.address);
  }

  newMap(): void {
    // seting up the map
    this.map = L.map('map', {});
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
    // mapbox street tile
    var mapboxStreet = L.tileLayer(
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
    );
    mapboxStreet.addTo(this.map);
    //street tile
    var googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    // googleStreets.addTo(this.map);
    //Hybrid tile
    var googleHybrid = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    // googleHybrid.addTo(this.map);
    //Terrain tile
    var googleTerrain = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    // googleTerrain.addTo(this.map);

    // custom fontawesome icon used as marker-icon
    const userIcon = L.divIcon({
      html: '<i class="fas fa-university fa-3x"></i>',
      iconSize: [20, 20],
      className: 'myDivIcon',
    });
    const hospitalIcon = L.divIcon({
      html: '<i class="fas fa-hospital fa-2x"></i>',
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
      icon: userIcon,
    }).addTo(this.map);
    OVGUmarker.bindPopup('Otto-von-Guericke Universität').openPopup();

    // marker for Hochschule Magdeburg-Stendal
    let marker = L.marker([52.1401298, 11.6757769], {
      icon: userIcon,
    }).addTo(this.map);
    marker.bindPopup('Hochschule Magdeburg-Stendal').openPopup();

    // for tracking live location by setting watch to true and setting the view to the location of the user
    let newLatLng: any;
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
      newLatLng = e.latlng;
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
    this.map.on('click', onMapClick); // leaflet click event

    // First Layer Groups
    var NordPark = L.marker([52.144658, 11.64302]).bindPopup('NordPark'),
      MagdeburgHbf = L.marker([52.130449, 11.626732]).bindPopup(
        'Magdeburg Hbf'
      ),
      Schoenebeck = L.marker([52.020406, 11.736177]).bindPopup('Schoenebeck'),
      Wolfsburg = L.marker([52.42411, 10.780532]).bindPopup('Wolfsburg');

    var cities: any = L.layerGroup([
      NordPark,
      MagdeburgHbf,
      Schoenebeck,
      Wolfsburg,
    ]).addTo(this.map);

    // Second Layer Groups (Hospitals)
    var marienstift = L.marker([52.135769, 11.6007827], {
        icon: hospitalIcon,
      }).bindPopup('Hospital St. Marienstift Magdeburg GmbH'),
      OVGUHospital = L.marker([52.1027384, 11.61544317], {
        icon: hospitalIcon,
      }).bindPopup(
        'Magdeburg Hospital of the Otto-von-Guericke University Magdeburg'
      ),
      klinikumMagdeburg = L.marker([52.15751695, 11.58202892], {
        icon: hospitalIcon,
      }).bindPopup('Klinikum Magdeburg gemeinnützige GmbH'),
      OVGUfrauenklinik = L.marker([52.12946185, 11.61773666], {
        icon: hospitalIcon,
      }).bindPopup(
        'Otto-von-Guericke-Universität Magdeburg Universitätsfrauenklinik'
      );

    var hospitals: any = L.layerGroup([
      marienstift,
      OVGUHospital,
      klinikumMagdeburg,
      OVGUfrauenklinik,
    ]).addTo(this.map);

    // map layers control
    var baseMaps = {
      MapboxStreet: mapboxStreet,
      GoogleStreets: googleStreets,
      GoogleSatelite: googleHybrid,
      GoogleTerrain: googleTerrain,
    };

    // marker control
    var overlayMaps = {
      cities: cities,
      Hospitals: hospitals,
      // 'Second Marker': secondMarker,
    };
    L.control
      .layers(baseMaps, overlayMaps, { collapsed: true })
      .addTo(this.map);

    // Routing machine
    // The instruction for using routing can be found on https://chanakadrathnayaka.github.io/types-leaflet-routing-machine/
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `http://router.project-osrm.org/route/v1/`,
      }),
      showAlternatives: true,
      fitSelectedRoutes: false,
      show: true,
      autoRoute: true,
      routeWhileDragging: true,
      waypoints: [
        L.latLng(52.130449, 11.626732),
        L.latLng(52.144658, 11.64302),
      ],
    }).addTo(this.map);
  }
  // Here we are using a keyup event to trigger the getAddress function, and a timeout of 2 seconds is
  //to prevent calling addressSearch function everytime a key is pressed. The values entered into the input
  //field are taking every 2 seconds after a keyup event is initiated.
  getAddress() {
    setTimeout(() => {
      this.addressSearch();
    }, 2000);
  }
  // we are converting the address string into a json data containing the full location of the address and its latitude and longitude
  // using nominatin. the response is taken and saved in ArrayofAddress
  addressSearch() {
    let xmlhttp = new XMLHttpRequest();
    let url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${this.address.trim()}`;
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        let myArr = JSON.parse(xmlhttp.responseText);
        for (let address of myArr) {
          console.log(this.ArrayOfAddress.display_name);
          this.ArrayOfAddress = address;
        }
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    console.log(url);
  }

  addressSearchResult(value: any) {
    this.ArrayOfAddress = value;
    console.log(this.ArrayOfAddress);
  }
  // showPosition(position: any) {
  //   this.latitude = position.coords.latitude;
  //   this.longitude = position.coords.longitude;
  //   console.log([this.latitude, this.longitude]);
  // }

  // Function to log geolocation status. Status is either granted, prompt, or denied
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

  // The map function is executed here
  ngAfterViewInit() {
    this.newMap();
  }
}
