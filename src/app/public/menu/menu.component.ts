import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { ProduitsService } from '../services/produits.service';
import { Menu } from '../models/menu/menu';
import { Produit } from '../models/produits/produit';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit  {
  menus: Menu[] = [];
  produits: Produit[] = [];
  loading = false;
  errorMessage = '';

  constructor(private menuService: MenuService, private produitsService: ProduitsService) {}

   ngOnInit(): void {
    this.menuService.getMenuActives().subscribe({
      next: (data) => this.menus = data,
      error: (err) => console.error('Erreur menus', err)
    });
    this.loadProduitsActifs();
  }

   loadProduitsActifs(): void {
    this.loading = true;
    this.errorMessage = '';

    this.produitsService.getProduitsActifs().subscribe({
      next: (produits) => {
        this.produits = produits;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits', error);
        this.errorMessage = 'Erreur lors du chargement des produits';
        this.loading = false;
      }
    });
  }
  // Méthode pour formater le prix
  formatPrice(price: number | undefined): string {
    if (price === undefined || price === null) return '0.00';
    return price.toFixed(2);
  }


}
