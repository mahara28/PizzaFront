import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu/menu.js';
import { Produit } from '../models/produits/produit.js';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8081/public';

    // Ajouter un menu
  ajouterMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiUrl}/ajouter`, menu);
  }

  // Récupérer tous les menus
  getAllMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/allMenu`);
  }

  getMenuActives(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/MenuActives`);
  }

 getMenusActifs(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/menus-actifs`);
  }

  // ✅ Récupérer les produits d’un menu donné
  getProduitsByMenu(idMenu: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/menu/${idMenu}/produits`);
  }


  // Modifier un menu
  modifierMenu(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/modifier`, menu);
  }

  // Supprimer un menu par id
  supprimerMenu(idMenu: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/supprimer/${idMenu}`);
  }
}
