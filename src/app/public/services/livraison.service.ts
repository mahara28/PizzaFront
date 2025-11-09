import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface DeliveryAddress {
  street: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
  latitude?: number;
  longitude?: number;
}

export interface DeliveryOption {
  type: 'pickup' | 'delivery';
  address?: DeliveryAddress;
  distance?: number;
  available: boolean;
  estimatedTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  // Coordonnées de la pizzeria (à adapter)
  private readonly PIZZERIA_COORDINATES = {
    latitude: environment.latitude, // Paris
    longitude: environment.longitude
  };

  private readonly MAX_DELIVERY_DISTANCE = environment.MAX_DELIVERY_DISTANCE;

  constructor(private http: HttpClient) { }

  // Vérifier si une adresse est dans la zone de livraison
  checkDeliveryAvailability(address: DeliveryAddress): Observable<{ available: boolean, distance?: number, message?: string }> {
    return this.geocodeAddress(address).pipe(
      map(coordinates => {
        if (!coordinates) {
          return { available: false, message: 'Adresse non trouvée' };
        }

        const distance = this.calculateDistance(
          coordinates.latitude,
          coordinates.longitude,
          this.PIZZERIA_COORDINATES.latitude,
          this.PIZZERIA_COORDINATES.longitude
        );
        console.log('Distance calculée:', distance, 'km');
        const available = distance <= this.MAX_DELIVERY_DISTANCE;

        return {
          available,
          distance: Math.round(distance * 10) / 10, // Arrondir à 1 décimale
          message: available
            ? `Livraison disponible (${distance} km)`
            : `Livraison non disponible (${distance} km - limite: ${this.MAX_DELIVERY_DISTANCE} km)`
        };
      }),
      catchError(error => {
        return of({
          available: false,
          message: 'Erreur lors de la vérification de l\'adresse'
        });
      })
    );
  }

  // Géocoder une adresse (utiliser un service comme OpenStreetMap Nominatim)
  private geocodeAddress(address: DeliveryAddress): Observable<{ latitude: number, longitude: number } | null> {
    const query = `${address.street}, ${address.city}, ${address.postalCode}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    return this.http.get<any[]>(url).pipe(
      map(results => {
        if (results && results.length > 0) {
          return {
            latitude: parseFloat(results[0].lat),
            longitude: parseFloat(results[0].lon)
          };
        }
        return null;
      })
    );
  }

  // Calculer la distance entre deux points (formule de Haversine)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance en km
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Obtenir le temps estimé de livraison
  getEstimatedDeliveryTime(distance?: number): string {
    if (!distance) return '20-30 minutes';

    const baseTime = 20; // minutes de base
    const additionalTime = Math.ceil(distance * 3); // 3 minutes par km
    return `${baseTime + additionalTime}-${baseTime + additionalTime + 10} minutes`;
  }
}
