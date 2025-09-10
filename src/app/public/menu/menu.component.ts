import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {/*  implements OnInit {
   produits: Produit[] = [];

   constructor(private produitServ: ProduitsService) {}
  ngOnInit(): void {
   /*  this.produitServ.getProduits().subscribe({
      next: (data) => this.produits = data,
      error: (err) => console.error('Erreur chargement produits:', err)
    });
  } */
  


}