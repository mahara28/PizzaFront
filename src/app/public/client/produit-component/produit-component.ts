import { Component } from '@angular/core';
import { ProduitsService } from '../../services/produits.service';

@Component({
  selector: 'app-produit-component',
  templateUrl: './produit-component.html',
  styleUrls: ['./produit-component.scss']
})
export class ProduitComponent {

  constructor(private productService: ProduitsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(){}
}
