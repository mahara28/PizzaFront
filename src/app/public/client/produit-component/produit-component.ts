import { Component, HostListener } from '@angular/core';
import { ProduitsService } from '../../services/produits.service';
import { MenuService } from '../../services/menu.service';
import { PanierService } from '../../services/panier.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produit-component',
  templateUrl: './produit-component.html',
  styleUrls: ['./produit-component.scss']
})
export class ProduitComponent {
  lstProduit: any[] = [];
  lstMenu: any[] = [];
  filteredProducts: any[] = [];

  // Ajoutez ces méthodes à votre composant
  activeDropdown: string = '';

  // Filtres
  selectedCategories: number[] = [1];
  priceRange: number = 1;
  selectedSizes: string[] = ['Petite'];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  // Panier
  cartItemCount: number = 0;

  //notification
  showToast: boolean = false;
  toastProductName: string = '';

  constructor(private productService: ProduitsService, private menuService: MenuService, private panierService: PanierService) { }

  ngOnInit(): void {
    this.getMenu();
    this.loadProducts();
    this.subscribeToPanier();
  }

  getMenu() {
    this.menuService.getMenuActives().subscribe((data: any) => {
      this.lstMenu = data;
      // Initialiser toutes les catégories comme sélectionnées
      //this.selectedCategories = this.lstMenu.map(menu => menu.idMenu);
    });
  }

  loadProducts() {
    this.productService.getProduitsActifs().subscribe((data: any) => {
      this.lstProduit = data;
      this.applyFilters();
    });
  }

  // Gestion des filtres de catégorie
  onCategoryChange(categoryId: number, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
    this.applyFilters();
  }

  // Gestion du filtre de prix
  onPriceChange(event: any) {
    this.priceRange = event.target.value;
    this.applyFilters();
  }

  // Gestion des filtres de taille
  onSizeChange(size: string, event: any) {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    }
    this.applyFilters();
  }

  // Application des filtres
  applyFilters() {
    this.currentPage = 1; // Réinitialiser à la première page

    this.filteredProducts = this.lstProduit.filter(product => {
      // Filtre par catégorie
      const categoryMatch = this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.idMenu);

      // Filtre par prix
      const priceMatch = product.prixLiv <= this.priceRange;

      // Filtre par taille (vous devrez adapter cette logique)
      const sizeMatch = this.selectedSizes.length === 0 ||
        this.selectedSizes.includes(this.getProductSize(product)); // Méthode à implémenter

      return categoryMatch && priceMatch && sizeMatch;
    });

    this.updatePagination();
  }

  // Méthode pour déterminer la taille du produit (à adapter selon votre structure)
  getProductSize(product: any): string {
    switch (product.idTaill) {
      case 1: return "Petite"
      case 2: return "Moyenne"
      case 3: return "Grande"
      case 4: return "Familiale"
      default: return "Petite"
    }

  }

  // Pagination
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }


  // S'abonner aux changements du panier
  subscribeToPanier(): void {
    this.panierService.cart$.subscribe(items => {
      this.cartItemCount = this.panierService.getTotalItems();
    });
  }

  // Fonction pour ajouter au panier
  addToCart(product: any): void {
    // sélectionner la taille si nécessaire
    const selectedSize = this.selectedSizes[0] || 'Moyenne'; // Taille par défaut

    this.panierService.addToCart(product, 1, selectedSize);

    // Afficher un message de confirmation
    this.showAddToCartMessage(product.libePrd);
  }

  // Message de confirmation (optionnel)
  private showAddToCartMessage(productName: string): void {
    this.toastProductName = productName;
    this.showToast = true;

    // Masquer automatiquement après 3 secondes
    setTimeout(() => {
      this.hideToast();
    }, environment.toast_duration);
  }

  hideToast(): void {
    this.showToast = false;
  }

  toggleDropdown(dropdown: string): void {
    this.activeDropdown = this.activeDropdown === dropdown ? '' : dropdown;
  }

  resetFilters(): void {
    //this.selectedCategories = this.lstMenu.map(menu => menu.idMenu);
    this.selectedCategories = [1];
    this.priceRange = 1;
    this.selectedSizes = ['Petite'];
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.selectedCategories.length < this.lstMenu.length ||
      this.priceRange < 30 ||
      this.selectedSizes.length < 4;
  }

  getSelectedCategoriesNames(): string[] {
    return this.lstMenu
      .filter(menu => this.selectedCategories.includes(menu.idMenu))
      .map(menu => menu.libeMenu);
  }

  removeCategoryFilter(categoryName: string): void {
    const category = this.lstMenu.find(menu => menu.libeMenu === categoryName);
    if (category) {
      this.selectedCategories = this.selectedCategories.filter(id => id !== category.idMenu);
      this.applyFilters();
    }
  }

  resetPrice(): void {
    this.priceRange = 30;
    this.applyFilters();
  }

  removeSizeFilter(size: string): void {
    this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    this.applyFilters();
  }

  // Fermer les dropdowns en cliquant ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!(event.target as Element).closest('.filter-dropdown')) {
      this.activeDropdown = '';
    }
  }

}
