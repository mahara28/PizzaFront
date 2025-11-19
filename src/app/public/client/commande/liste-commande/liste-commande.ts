import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/public/services/commande.service';
import { MenuService } from 'src/app/public/services/menu.service';

@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.html',
  styleUrls: ['./liste-commande.scss']
})
export class ListeCommande implements OnInit {
  jwtToken: any
  userInfo: any

  /* allOrders: any[] = [
    {
      id: 1,
      numCom:"COM-2025-161101"
      dateCreation: new Date('2023-10-15T18:30:00'),
      etat: 'delivered',
      produits: [
        { libePrd: 'Pepperoni', quantity: 1, price: 12.90, icon: 'fas fa-pizza-slice' },
        { name: '4 Fromages', quantity: 1, price: 13.50, icon: 'fas fa-pizza-slice' },
        { name: 'Coca-Cola 1.5L', quantity: 1, price: 3.50, icon: 'fas fa-wine-bottle' }
      ],
      typeLivraison: 'delivery',
      address: '19 rue de la Paix, Paris',
      prix: 29.90
    },
    {
      id: 'DOM-2023-002',
      date: new Date('2023-10-12T20:15:00'),
      status: 'on-the-way',
      items: [
        { name: 'Spéciale Maison', quantity: 1, price: 14.90, icon: 'fas fa-pizza-slice' },
        { name: 'Tiramisu', quantity: 2, price: 5.00, icon: 'fas fa-ice-cream' }
      ],
      deliveryInfo: {
        type: 'delivery',
        address: '45 avenue des Champs-Élysées, Paris',
        deliveryTime: '20-30 minutes'
      },
      total: 24.90
    },
    {
      id: 'DOM-2023-003',
      date: new Date('2023-10-08T19:45:00'),
      status: 'preparing',
      items: [
        { name: 'Margherita', quantity: 2, price: 10.90, icon: 'fas fa-pizza-slice' },
        { name: 'Buffalo Wings', quantity: 1, price: 8.50, icon: 'fas fa-drumstick-bite' }
      ],
      deliveryInfo: {
        type: 'pickup',
        address: 'Domino\'s Paris Centre',
        deliveryTime: '~15 minutes'
      },
      total: 30.30
    },
    {
      id: 'DOM-2023-004',
      date: new Date('2023-10-05T21:00:00'),
      status: 'cancelled',
      items: [
        { name: 'Hawaïenne', quantity: 1, price: 12.50, icon: 'fas fa-pizza-slice' },
        { name: 'Coca-Cola 1.5L', quantity: 1, price: 3.50, icon: 'fas fa-wine-bottle' }
      ],
      deliveryInfo: {
        type: 'delivery',
        address: '12 rue du Commerce, Paris',
        reason: 'Annulée par le client'
      },
      total: 16.00
    },
    {
      id: 'DOM-2023-005',
      date: new Date('2023-10-01T17:20:00'),
      status: 'delivered',
      items: [
        { name: 'Végétarienne', quantity: 1, price: 11.90, icon: 'fas fa-pizza-slice' },
        { name: 'Salade César', quantity: 1, price: 6.50, icon: 'fas fa-leaf' }
      ],
      deliveryInfo: {
        type: 'delivery',
        address: '28 boulevard Saint-Germain, Paris',
        deliveryTime: '18:05'
      },
      total: 18.40
    }
  ];  */
  allOrders: any[] = []
  groupedOrders: any[] = []
  // Filtres et pagination
  filteredOrders: any[] = [];
  currentFilter: string = 'all';
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  // Textes des statuts
  statusTexts = {
    'Livrée': 'Livrée',
    'En attente': 'En attente',
    'En préparation': 'En préparation',
    'En route': 'En route',
    'Annulée': 'Annulée'
  };

  statusIcons = {
    'En attente': 'fas fa-clock',
    'Livrée': 'fas fa-check',
    'En préparation': 'fas fa-utensils',
    'En route': 'fas fa-motorcycle',
    'Annulée': 'fas fa-ban'
  }

  constructor(private _menu: MenuService, private _commande: CommandeService) { }
  ngOnInit(): void {
    this.jwtToken = sessionStorage.getItem("jwtToken")
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "")
    console.log(this.userInfo.sub)
    this.loadOrdre();
  }

  loadOrdre() {
    this._commande.getOrders(this.userInfo.sub).subscribe((data: any) => {
      this.allOrders = data
      this.groupOrdersByCommande();
      console.log(data)
    })
  }

  groupOrdersByCommande() {
    const map = new Map<number, any>();

    this.allOrders.forEach(item => {
      if (!map.has(item.idCommande)) {
        map.set(item.idCommande, {
          numCom: item.numCom,
          dateCreation: item.dateCreation,
          etat: item.etat,
          adresse: item.adresse,
          typeLivraison: item.typeLivraison,
          produits: [],
          total: item.prix
        });
      }

      const commande = map.get(item.idCommande);

      commande.produits.push({
        name: item.libePrd,
        quantity: item.quantite,
        price: item.prixLiv
      });

      //commande.total += (item.prixLiv * item.quantite);
    });

    this.groupedOrders = Array.from(map.values());
    this.applyFilters();
  }

  // Appliquer les filtres
  applyFilters(): void {
    this.currentPage = 1;

    let filtered = [...this.groupedOrders];

    // -------- FILTRE PAR STATUT --------
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(order => order.etat === this.currentFilter);
    }

    // -------- FILTRE PAR RECHERCHE TEXTE --------
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();

      filtered = filtered.filter(order =>
        order.id.toString().includes(term) ||                     // id
        order.libePrd?.toLowerCase().includes(term) ||           // nom du produit
        order.description?.toLowerCase().includes(term) ||       // description produit
        order.adresse?.toLowerCase().includes(term) ||           // adresse
        order.numCom?.toLowerCase().includes(term)               // numéro commande
      );
    }

    // -------- TRI PAR DATE (plus récent en premier) --------
    filtered = filtered.sort((a, b) => {
      const dateA = a.dateCreation ? new Date(a.dateCreation).getTime() : 0;
      const dateB = b.dateCreation ? new Date(b.dateCreation).getTime() : 0;
      return dateB - dateA;
    });

    this.filteredOrders = filtered;
    this.updatePagination();
  }


  // -------- Changer le filtre --------
  setFilter(filter: string): void {
    this.currentFilter = filter;
    this.applyFilters();
    this.currentPage = 1; // Toujours revenir à la première page
  }

  // -------- Recherche --------
  onSearch(event: any): void {
    this.searchTerm = event.target.value?.trim() || '';
    this.applyFilters();
    this.currentPage = 1; // Toujours revenir à la première page
  }

  // -------- Pagination --------
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredOrders.length / this.itemsPerPage) || 1;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages; // Eviter d'aller au-delà
    }
  }

  // -------- Getter : commandes paginées --------
  get paginatedOrders(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, endIndex);
  }

  // -------- Navigation pages --------
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // -------- Générer les numéros de page --------
  get pages(): number[] {
    if (this.totalPages <= 1) return [];
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  // Formater la date
  formatDate(date: any): string {
    if (!date) return ''; // Si null ou undefined

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return ''; // Si mauvaise date

    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(parsedDate);
  }


  // Formater le prix
  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',') + '€';
  }

  // Obtenir le texte du statut
  getStatusText(status: string): string {
    return this.statusTexts[status as keyof typeof this.statusTexts] || status;
  }

  // Obtenir l'icône du statut
  getStatusIcon(status: string): string {
    return this.statusIcons[status as keyof typeof this.statusIcons] || 'fas fa-question';
  }

  // Actions des commandes
  reorder(order: any): void {
    console.log('Commander à nouveau:', order);
    // Implémentez la logique de recommande
  }

  viewInvoice(order: any): void {
    console.log('Voir la facture:', order);
    // Implémentez la logique de facture
  }

  rateOrder(order: any): void {
    console.log('Noter la commande:', order);
    // Implémentez la logique de notation
  }

  trackOrder(order: any): void {
    console.log('Suivre la commande:', order);
    // Implémentez la logique de suivi
  }

  contactSupport(order: any): void {
    console.log('Contacter le support:', order);
    // Implémentez la logique de support
  }

  cancelOrder(order: any): void {
    console.log('Annuler la commande:', order);
    // Implémentez la logique d'annulation
  }


}
