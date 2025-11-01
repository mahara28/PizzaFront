import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { Menu } from '../models/menu/menu.js';
=======
import { environment } from 'src/environments/environment';
>>>>>>> 3f598a6027486652be28961a07f1beac58f92a95

@Injectable({
  providedIn: 'root'
})
export class MenuService {

<<<<<<< HEAD
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




  // Modifier un menu
  modifierMenu(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/modifier`, menu);
  }

  // Supprimer un menu par id
  supprimerMenu(idMenu: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/supprimer/${idMenu}`);
  }
=======
  constructor(private http: HttpClient) { }

  getMenus(): Observable<any> {
    return this.http.get(environment.URL_CON + '/menu/allMenu')
  }

>>>>>>> 3f598a6027486652be28961a07f1beac58f92a95
}
