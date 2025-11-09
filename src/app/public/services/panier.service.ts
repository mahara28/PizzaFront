import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  idPrd: number;
  libePrd: string;
  description: string;
  prixLiv: number;
  quantity: number;
  taille?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    // Charger le panier depuis le localStorage au démarrage
    this.loadCartFromStorage();
  }

  
  // Ajouter un produit au panier
  addToCart(product: any, quantity: number = 1, taille: string = 'Moyenne'): void {
    const existingItem = this.cartItems.find(item => 
      item.idPrd === product.idPrd && item.taille === taille
    );

    if (existingItem) {
      // Si le produit existe déjà, augmenter la quantité
      existingItem.quantity += quantity;
    } else {
      // Sinon, ajouter un nouvel item
      const newItem: CartItem = {
        idPrd: product.idPrd,
        libePrd: product.libePrd,
        description: product.description,
        prixLiv: product.prixLiv,
        quantity: quantity,
        taille: taille
      };
      this.cartItems.push(newItem);
    }

    this.updateCart();
  }

  // Supprimer un item du panier
  removeFromCart(productId: number, taille?: string): void {
    this.cartItems = this.cartItems.filter(item => 
      !(item.idPrd === productId && item.taille === taille)
    );
    this.updateCart();
  }

  // Mettre à jour la quantité d'un item
  updateQuantity(productId: number, quantity: number, taille?: string): void {
    const item = this.cartItems.find(item => 
      item.idPrd === productId && item.taille === taille
    );
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId, taille);
      } else {
        item.quantity = quantity;
        this.updateCart();
      }
    }
  }

  // Vider le panier
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  // Obtenir le nombre total d'articles
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtenir le total du panier
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.prixLiv * item.quantity), 0);
  }

  // Obtenir les items du panier
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  // Mettre à jour le panier et sauvegarder
  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }

  // Sauvegarder dans le localStorage
  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Charger depuis le localStorage
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next([...this.cartItems]);
    }
  }

}
