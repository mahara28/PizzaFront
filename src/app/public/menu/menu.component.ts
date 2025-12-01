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
  selectedMenuId: number | null = null;



  constructor(private menuService: MenuService, private produitsService: ProduitsService) {}

   ngOnInit(): void {
     this.loadMenus();
  }
 loadMenus(): void {
    this.menuService.getMenusActifs().subscribe({
      next: (data) => {
        this.menus = data;

        // ✅ Sélectionner automatiquement le menu 1 (par défaut)
        const defaultMenu = this.menus.find(menu => menu.idMenu === 1);
        if (defaultMenu) {
          this.selectedMenuId = defaultMenu.idMenu;
          this.loadProduitsByMenu(defaultMenu.idMenu);
        } else if (this.menus.length > 0) {
          // Si le menu 1 n'existe pas, on prend le premier
          this.selectedMenuId = this.menus[0].idMenu;
          this.loadProduitsByMenu(this.menus[0].idMenu);
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des menus :', err);
        this.errorMessage = 'Impossible de charger les menus.';
      }
    });
  }

  // ✅ Lorsqu’on sélectionne un menu
  selectMenu(menu: Menu): void {
    this.selectedMenuId = menu.idMenu;
    this.loadProduitsByMenu(menu.idMenu);
  }

  // ✅ Charger les produits liés au menu
  loadProduitsByMenu(idMenu: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.menuService.getProduitsByMenu(idMenu).subscribe({
      next: (produits) => {
        this.produits = produits;
         this.produits.forEach(produit => {
         if (produit.idImg) {
          this.produitsService.getImageName(produit.idImg).subscribe({
            next: (name) => {
              produit.imageName = name;
            },

       error: (err) => {
              console.warn('Erreur lors du chargement du nom de l\'image:', err);
              // Récupérer le nom depuis l'erreur si c'est une erreur de parsing
              if (err.error && err.error.text) {
                produit.imageName = err.error.text;
              } else {
                produit.imageName = 'default.png';
              }
            }
          });
        }
      });
      this.loading = false;
    },
    error: (err) => {
      console.error('Erreur lors du chargement des produits du menu', err);
      this.errorMessage = 'Aucun produit trouvé pour ce menu.';
      this.produits = [];
      this.loading = false;
    }
  });
  }


  // Formater le prix
  formatPrice(price: number | undefined): string {
    if (price === undefined || price === null) return '0.00';
    return price.toFixed(2);
  }

}
