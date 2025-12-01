import { HttpClient, HttpParams, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produit } from '../models/produits/produit';

@Injectable({
  providedIn: 'root'
})

export class ProduitsService {

constructor(private http: HttpClient) {}
private apiUrl = 'http://localhost:8081/public';

// Récupérer tous les produits actifs
  getProduitsActifs(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/ProduitActives`);
  }
 // Recherche de produits avec filtres
  searchProduits(filters: {
    libePrd?: string;
    souCat?: string;
    idTaill?: number;
    prixMin?: number;
    prixMax?: number;
    acti?: boolean;
  }): Observable<Produit[]> {

    let params = new HttpParams();

    if (filters.libePrd) {
      params = params.set('libePrd', filters.libePrd);
    }
    if (filters.souCat) {
      params = params.set('souCat', filters.souCat);
    }
    if (filters.idTaill !== undefined) {
      params = params.set('idTaill', filters.idTaill.toString());
    }
    if (filters.prixMin !== undefined) {
      params = params.set('prixMin', filters.prixMin.toString());
    }
    if (filters.prixMax !== undefined) {
      params = params.set('prixMax', filters.prixMax.toString());
    }
    if (filters.acti !== undefined) {
      params = params.set('acti', filters.acti.toString());
    }

    return this.http.get<Produit[]>(`${this.apiUrl}/searchProduit`, { params });
  }

  // Méthodes utilitaires pour des recherches spécifiques
  searchByNom(nom: string): Observable<Produit[]> {
    return this.searchProduits({ libePrd: nom, acti: true });
  }

  searchByCategorie(souCat: string): Observable<Produit[]> {
    return this.searchProduits({ souCat: souCat, acti: true });
  }
getProduitsByMenu(idMenu: number): Observable<Produit[]> {
  return this.http.get<Produit[]>(`${this.apiUrl}/produit/menu/${idMenu}`);
}

getImageName(idImg: number) : Observable<string>{
  return this.http.get<{imageName: string}>(`${this.apiUrl}/${idImg}/imageName`).pipe(map(response => response.imageName));
}
}
