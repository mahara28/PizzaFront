import { CommonModule } from '@angular/common';
import { Component,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements AfterViewInit {
 @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  center: google.maps.LatLngLiteral = { lat: 36.8065, lng: 10.1815 };
  zoom = 13;

  step = 1;
  adresse = '';
  rue = '';
  infos = '';
  batiment = '';
  horaire = '';
  date = '';

  constructor(private router: Router) {}

   ngAfterViewInit(): void {
    this.initMap();
  }

   private initMap(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: this.center,
      zoom: this.zoom
    });

    this.marker = new google.maps.Marker({
      position: this.center,
      map: this.map,
      draggable: true
    });

    this.marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.getAddressFromCoords(event.latLng.lat(), event.latLng.lng());
      }
    });

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.marker.setPosition(event.latLng);
        this.getAddressFromCoords(event.latLng.lat(), event.latLng.lng());
      }
    });
  }

  private getAddressFromCoords(lat: number, lng: number): void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === 'OK' && results && results.length > 0) {
          this.adresse = results[0].formatted_address;
        } else {
          this.adresse = '';
          console.warn('Aucune adresse trouvée.');
        }
      }
    );
  }


  nextStep() {
    if (this.step === 1 && this.adresse.trim() === '') return;
    if (this.step === 3 && (this.horaire.trim() === '' || this.date.trim() === '')) return;
    this.step++;
  }

  previousStep() {
    this.step--;
  }




  finish() {
  if (this.date && this.horaire) {
    console.log("✅ Livraison confirmée : ", {
      adresse: this.adresse,
      infos: this.infos,
      date: this.date,
      horaire: this.horaire
    });

    Swal.fire({
      title: 'Confirmation',
      text: '✅ Adresse confirmée, passage au menu !',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/menu']);
    });
  }
}
}
