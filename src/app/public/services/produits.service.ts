import { HttpClient, HttpParams, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produit } from '../models/produits/produit';

@Injectable({
  providedIn: 'root'
})

export class ProduitsService {

constructor(private http: HttpClient) {}
private apiUrl = 'http://localhost:8081/public';

<<<<<<< HEAD
// Récupérer tous les produits actifs
  getProduitsActifs(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/ProduitActives`);
=======
 /*   getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);

    return this.http.get<ApiResponse<DemandeB3[]>>(environment.URL_CON + '/demande/liste', { headers });

  } */

  
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.URL_CON + '/produit/allProduit')
>>>>>>> 3f598a6027486652be28961a07f1beac58f92a95
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

}
