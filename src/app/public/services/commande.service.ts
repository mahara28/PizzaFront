import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  jwtToken:any
  constructor(private http: HttpClient) { 
    this.jwtToken = localStorage.getItem("jwtToken")
    
  }

  // récupérer commandes
  getOrders(idClient:any) {
    return this.http.get(environment.URL_CON_AUTH + '/commande/commandeProduit/'+idClient, {
      headers: { Authorization: `Bearer ${this.jwtToken}` }
    });
  }

  getProduitOrdre(id:any){
    return this.http.get(environment.URL_CON_AUTH + '/commande/lstProduit'+id, {
      headers: { Authorization: `Bearer ${this.jwtToken}` }
    });
  }

  addOrdre(objet:any){
    return this.http.post(environment.URL_CON_AUTH + '/commande/ajouter',objet, {
      headers: { Authorization: `Bearer ${this.jwtToken}` }
    });
  }

}
