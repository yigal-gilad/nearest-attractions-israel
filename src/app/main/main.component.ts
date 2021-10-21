import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from "../state.service";
import { URL } from "../consts/url";
import { HttpService } from "../http.service";
import { attraction } from '../interfaces/attraction';

declare var ol: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public httpService: HttpService, public state: StateService, public router: Router) { }

  map: any;

  ngOnInit() {
    this.loadEmptyMap();
    this.state.state.stored_favorites = ["hi"];
  }

  loadEmptyMap() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([35.217018, 31.771959]),
        zoom: 6
      })
    });
    this.loadInitMap();
  }

  loadInitMap() {
    navigator.geolocation.getCurrentPosition(position => {
      this.state.state.user_latitude = position.coords.latitude;
      this.state.state.user_longitude = position.coords.longitude;
      this.setCenter();
      this.addPoint(this.state.state.user_latitude, this.state.state.user_longitude);
      this.getAttractionsList("any");
    });
  }


  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.state.state.user_longitude, this.state.state.user_latitude]));
    view.setZoom(6);
  }

  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          opacity: 1,
          scale: 0.2,
          src: URL + "/you.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }

  showAllDests(dists: attraction[]) {
    var i;
    for (i = 0; i < dists.length; i++) {
      if (dists[i].pos.coordinates[0] &&
        dists[i].pos.coordinates[1]) {
        this.showDest(dists[i].pos.coordinates[1],
          dists[i].pos.coordinates[0],
          dists[i].Name ?
            dists[i].Name :
            "name not provided");
      }
    }
  }

  showDest(lat: number, lng: number, name: string) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          opacity: 1,
          scale: 0.1,
          src: URL + "/dest.png"
        }),
        text: new ol.style.Text({
          text: name,
          scale: 1.2,
          fill: new ol.style.Fill({
            color: "#000000"
          })
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }

  createCatefories(arr: attraction[]) {
    for (let i = 0; i < arr.length; i++) {
      if (!this.state.state.categories.includes(arr[i].Attraction_Type)) {
        this.state.state.categories.push(arr[i].Attraction_Type);
      }
    }
  }

  getAttractionsList(category: string) {
    navigator.geolocation.getCurrentPosition(position => {
      this.state.state.user_latitude = position.coords.latitude;
      this.state.state.user_longitude = position.coords.longitude;

      this.httpService.getAttractions(this.state.state.user_longitude, this.state.state.user_latitude, category)
        .subscribe({
          next: data => {
            if (data.length) {
              var storage = JSON.parse(localStorage.getItem("favorites"));
              this.state.state.attractions_list = data;
              this.state.state.stored_favorites = storage ? storage : [];
              this.createCatefories(this.state.state.attractions_list);
              if (category === "any") {
                this.createCatefories(this.state.state.attractions_list);
                this.addPoint(this.state.state.user_latitude, this.state.state.user_longitude);
                this.showAllDests(this.state.state.attractions_list);
              }
            } else {
              alert("no resalts for this search...")
            }
          },
          error: error => {
            alert(error.error);

          }
        })
    });
  }

  changeFavorites(_id: string) {
    var storage = JSON.parse(localStorage.getItem("favorites"));
    this.state.state.stored_favorites = storage ? storage : [];
    if (this.state.state.stored_favorites.includes(_id)) {
      this.state.state.stored_favorites =
        this.state.state.stored_favorites.filter(e => e !== _id);
      localStorage.clear();
      localStorage.setItem("favorites", JSON.stringify(this.state.state.stored_favorites));
    } else {
      this.state.state.stored_favorites.push(_id);
      localStorage.clear();
      localStorage.setItem("favorites", JSON.stringify(this.state.state.stored_favorites));
    }
  }

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6378.1; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(Value) {
    return Value * Math.PI / 180;
  }

}
