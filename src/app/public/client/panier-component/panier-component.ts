import { Component } from '@angular/core';
import { CartItem, PanierService } from '../../services/panier.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { environment } from 'src/environments/environment';
import { DeliveryAddress, DeliveryOption, LivraisonService } from '../../services/livraison.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommandeService } from '../../services/commande.service';

export interface CommandeDTO {
  commande: any;
  produitCommandes: any[];
}

@Component({
  selector: 'app-panier-component',
  templateUrl: './panier-component.html',
  styleUrls: ['./panier-component.scss']
})
export class PanierComponent {

  cartItems: CartItem[] = [];
  deliveryFee: number = environment.deliveryFee;
  discount: number = 0;
  discountCode: string = '';

  // Produits suggérés
  suggestedItems: any[] = [];

  // Livraison
  deliveryOption: DeliveryOption | null = null;
  deliveryForm!: FormGroup;
  isCheckingAddress: boolean = false;
  deliveryAvailable: boolean = false;
  deliveryDistance?: number;

  constructor(
    private panierService: PanierService,
    private deliveryService: LivraisonService,
    private commandeService: CommandeService,
    private fb: FormBuilder
  ) {
    this.deliveryForm = this.createDeliveryForm();
  }

  ngOnInit(): void {
    this.panierService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  // Augmenter la quantité
  increaseQuantity(item: CartItem): void {
    this.panierService.updateQuantity(item.idPrd, item.quantity + 1, item.taille);
  }

  // Diminuer la quantité
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.panierService.updateQuantity(item.idPrd, item.quantity - 1, item.taille);
    }
  }

  // Supprimer un article
  removeItem(item: CartItem): void {
    this.panierService.removeFromCart(item.idPrd, item.taille);
  }

  // Obtenir le sous-total
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.prixLiv * item.quantity), 0);
  }

  // Obtenir le total
  getTotal(): number {
    return this.getSubtotal() + this.deliveryFee - this.discount;
  }

  // Obtenir le nombre total d'articles
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Appliquer un code promo
  applyDiscount(): void {
    // Logique pour vérifier le code promo
    if (this.discountCode.toUpperCase() === 'PIZZA10') {
      this.discount = 3.00;
    } else if (this.discountCode.toUpperCase() === 'PIZZA15') {
      this.discount = this.getSubtotal() * 0.15;
    } else {
      this.discount = 0;
      this.valide = false
      this.showAddToCartMessage("Code promo invalide");
      //alert('Code promo invalide');
    }
  }

  // Ajouter un produit suggéré
  addSuggestedItem(item: any): void {
    const suggestedProduct = {
      idPrd: item.id,
      libePrd: item.name,
      description: 'Produit suggéré',
      prixLiv: item.price,
      quantity: 1
    };
    this.panierService.addToCart(suggestedProduct, 1);
  }

  /* // Passer la commande
  checkout(): void {
    if (this.cartItems.length === 0) {
      //this.snackbar.open("Votre panier est vide")
      this.valide = false
      this.showAddToCartMessage("Votre panier est vide");
      //alert('Votre panier est vide');
      return;
    }

    // Logique de commande
    console.log('Commande passée:', this.cartItems);
    this.valide = true
    this.showAddToCartMessage("Commande passée avec succès!");

    //alert('Commande passée avec succès!');
    //this.panierService.clearCart();
  } */

  // Obtenir l'icône selon le type de produit
  getProductIcon(product: CartItem): string {
    // Logique pour déterminer l'icône selon le type de produit
    if (product.libePrd?.toLowerCase().includes('pizza')) {
      return 'fas fa-pizza-slice';
    } else if (product.libePrd?.toLowerCase().includes('boisson') || product.libePrd?.toLowerCase().includes('coca')) {
      return 'fas fa-wine-bottle';
    } else if (product.libePrd?.toLowerCase().includes('salade')) {
      return 'fas fa-leaf';
    } else if (product.libePrd?.toLowerCase().includes('dessert')) {
      return 'fas fa-ice-cream';
    } else {
      return 'fas fa-utensils';
    }
  }

  // Formater le prix
  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',') + '€';
  }

  showToast: boolean = false;
  message: string = '';
  valide: boolean = true;

  // Message de confirmation (optionnel)
  private showAddToCartMessage(message: string): void {
    this.message = message;
    this.showToast = true;

    // Masquer automatiquement après 3 secondes
    setTimeout(() => {
      this.hideToast();
    }, environment.toast_duration);
  }

  hideToast(): void {
    this.showToast = false;
  }


  ///////////////// LIVRAISON //////////

  createDeliveryForm(): FormGroup {
    return this.fb.group({
      street: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      additionalInfo: ['']
    });
  }

  // Choisir le mode de livraison
  selectDeliveryType(type: 'pickup' | 'delivery'): void {
    if (type === 'pickup') {
      this.deliveryOption = {
        type: 'pickup',
        available: true,
        estimatedTime: environment.pickup_estimatedTime
      };
      this.deliveryFee = 0;
    } else {
      this.deliveryOption = {
        type: 'delivery',
        available: false,
        estimatedTime: environment.delivery_estimatedTime
      };
      this.deliveryFee = environment.deliveryFee;
      this.deliveryForm.reset();
    }
  }

  // Vérifier l'adresse de livraison
  checkDeliveryAddress(): void {
    if (this.deliveryForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isCheckingAddress = true;
    const address: DeliveryAddress = this.deliveryForm.value;

    this.deliveryService.checkDeliveryAvailability(address).subscribe(result => {
      this.isCheckingAddress = false;
      this.deliveryAvailable = result.available;
      this.deliveryDistance = result.distance;

      if (this.deliveryOption) {
        this.deliveryOption.available = result.available;
        this.deliveryOption.estimatedTime = this.deliveryService.getEstimatedDeliveryTime(result.distance);
      }

      if (result.available) {
        Swal.fire({
          icon: 'success',
          title: 'Livraison disponible!',
          text: result.message,
          timer: environment.toast_duration,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hors zone de livraison',
          text: result.message,
          confirmButtonText: 'Compris'
        });
      }
    });
  }

  // Passer la commande
  async checkout(): Promise<void> {
    if (this.cartItems.length === 0) {
      Swal.fire('Panier vide', 'Votre panier est vide!', 'warning');
      return;
    }

    // Vérifier le mode de livraison
    if (!this.deliveryOption) {
      const { value: deliveryType } = await Swal.fire({
        title: 'Mode de livraison',
        text: 'Choisissez comment vous souhaitez recevoir votre commande',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Livraison',
        cancelButtonText: 'À emporter',
        reverseButtons: true
      });

      if (deliveryType === undefined) return;

      this.selectDeliveryType(deliveryType ? 'delivery' : 'pickup');

      if (deliveryType) {
        // Si livraison, demander l'adresse
        await this.showAddressForm();
        return;
      }
    }

    // Vérifier la disponibilité pour la livraison
    if (this.deliveryOption?.type === 'delivery' && !this.deliveryAvailable) {
      Swal.fire({
        icon: 'warning',
        title: 'Adresse requise',
        text: 'Veuillez vérifier votre adresse de livraison',
        confirmButtonText: 'Vérifier l\'adresse'
      });
      return;
    }

    // Confirmation finale
    this.showFinalConfirmation();
  }

  private async showAddressForm(): Promise<void> {
    // Étape 1: Demander l'adresse
    const { value: addressStep1 } = await Swal.fire({
      title: 'Adresse de livraison',
      html: `
      <input id="street" class="swal2-input" placeholder="Rue et numéro *" required>
      <input id="city" class="swal2-input" placeholder="Ville *" required>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const street = (document.getElementById('street') as HTMLInputElement).value;
        const city = (document.getElementById('city') as HTMLInputElement).value;

        if (!street || !city) {
          Swal.showValidationMessage('Veuillez remplir tous les champs obligatoires');
          return false;
        }

        return { street, city };
      }
    });

    if (!addressStep1) return;

    // Étape 2: Code postal et complément
    const { value: addressStep2 } = await Swal.fire({
      title: 'Suite de l\'adresse',
      html: `
      <input id="postalCode" class="swal2-input" placeholder="Code postal *" required pattern="[0-9]{5}">
      <input id="additionalInfo" class="swal2-input" placeholder="Complément d'adresse">
      <small style="text-align: left; display: block; margin-top: 10px; color: #666;">
        * Champs obligatoires
      </small>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Vérifier l\'adresse',
      cancelButtonText: 'Retour',
      preConfirm: () => {
        const postalCode = (document.getElementById('postalCode') as HTMLInputElement).value;
        const additionalInfo = (document.getElementById('additionalInfo') as HTMLInputElement).value;

        if (!/^[0-9]{5}$/.test(postalCode)) {
          Swal.showValidationMessage('Code postal invalide (5 chiffres requis)');
          return false;
        }

        return { postalCode, additionalInfo };
      }
    });

    if (addressStep2) {
      const formValues = { ...addressStep1, ...addressStep2 };
      this.deliveryForm.patchValue(formValues);
      this.checkDeliveryAddress();
    } else {
      // Retour à l'étape 1
      await this.showAddressForm();
    }
  }

  private showFinalConfirmation(): void {
    const deliveryText = this.deliveryOption?.type === 'pickup'
      ? `À emporter - Prêt dans ${environment.pickup_estimatedTime}`
      : `Livraison - ${this.deliveryOption?.estimatedTime}`;

    Swal.fire({
      title: 'Confirmer la commande',
      html: `
        <div style="text-align: left;">
          <p><strong>${this.getTotalItems()} article(s)</strong></p>
          <p><strong>Mode:</strong> ${deliveryText}</p>
          ${this.deliveryOption?.type === 'delivery' ? `
            <p><strong>Adresse:</strong> ${this.deliveryForm.value.street}, ${this.deliveryForm.value.postalCode} ${this.deliveryForm.value.city}</p>
          ` : ''}
          <p><strong>Total: ${this.formatPrice(this.getTotal())}</strong></p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmer la commande',
      cancelButtonText: 'Modifier',
      confirmButtonColor: '#28a745'
    }).then((result) => {
      if (result.isConfirmed) {
        this.processOrder();
      }
    });
  }

  private processOrder(): void {
    // Préparer les données de la commande
    const commandeData = this.prepareCommandeData();

    if (!commandeData) {
      Swal.fire('Erreur', 'Impossible de préparer la commande', 'error');
      return;
    }

    Swal.fire({
      title: 'Traitement en cours...',
      text: 'Votre commande est en cours de préparation',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Envoyer la commande au backend
    this.commandeService.addOrdre(commandeData).subscribe({
      next: (response: any) => {
        console.log('Commande sauvegardée:', response);

        Swal.fire({
          icon: 'success',
          title: 'Commande confirmée!',
          html: `
          <div style="text-align: center;">
            <p><strong>Merci pour votre commande!</strong></p>
            <p>Numéro: <strong>#${response.numCom || response.id}</strong></p>
            <p>${this.deliveryOption?.type === 'pickup'
              ? 'Votre commande sera prête dans 15-25 minutes'
              : `Livraison estimée: ${this.deliveryOption?.estimatedTime}`}</p>
          </div>
        `,
          confirmButtonText: 'Parfait!'
        }).then(() => {
          this.panierService.clearCart();
          this.deliveryOption = null;
          this.deliveryForm.reset();
        });
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde:', error);

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la commande. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // Préparer les données de la commande
  private prepareCommandeData(): CommandeDTO | null {
    if (this.cartItems.length === 0) {
      return null;
    }
    const currentUser = JSON.parse(sessionStorage.getItem("userInfo") || "")
    // Récupérer l'utilisateur connecté
    if (!currentUser) {
      console.error('Utilisateur non connecté');
      return null;
    }
    
    // Préparer la commande principale
    const commande: any = {
      prix: this.getTotal(),
      client: currentUser.sub, // ou currentUser.email selon votre besoin
      etat: 'En Attente', // ou 'preparing'
      typeLivraison: this.deliveryOption?.type === 'delivery' ? 'livraison' : 'emporter',
      codePromo: this.discount > 0 ? this.discountCode : undefined
    };

    // Ajouter l'adresse si c'est une livraison
    if (this.deliveryOption?.type === 'delivery' && this.deliveryForm.valid) {
      const formValue = this.deliveryForm.value;
      commande.adresse = `${formValue.street}, ${formValue.postalCode} ${formValue.city}`;
      if (formValue.additionalInfo) {
        commande.adresse += ` - ${formValue.additionalInfo}`;
      }
    }

    // Préparer les produits de la commande
    const produitCommandes: any[] = this.cartItems.map(item => ({
      idProduit: item.idPrd, // Adaptez selon votre structure
      quantite: item.quantity,
      //prix: item.prixLiv, // Sauvegarder le prix au moment de la commande
      //nomProduit: item.libePrd // Optionnel
    }));

    return {
      commande,
      produitCommandes
    };
  }

  // Méthodes utilitaires
  private markFormGroupTouched(): void {
    Object.keys(this.deliveryForm.controls).forEach(key => {
      this.deliveryForm.get(key)?.markAsTouched();
    });
  }


}
