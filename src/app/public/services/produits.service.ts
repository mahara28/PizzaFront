import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produit } from '../models/produits/produit';

@Injectable({
  providedIn: 'root'
})

export class ProduitsService {

  constructor(private http: HttpClient) { }

 /*   getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);

    return this.http.get<ApiResponse<DemandeB3[]>>(environment.URL_CON + '/demande/liste', { headers });

  } */

  
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.URL_CON + '/produit/allProduit')
  }
}
