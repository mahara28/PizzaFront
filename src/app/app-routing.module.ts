import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvisClientsComponent } from './public/avis-clients/avis-clients.component';
import { IndexComponent } from './public/index/index.component';
import { MenuComponent } from './public/menu/menu.component';
import { LivraisonComponent } from './public/livraison/livraison.component';
import { MagasinsComponent } from './public/magasins/magasins.component';
import { PromoComponent } from './public/promo/promo.component';
import { LoginComponent } from './admin/login/login.component';
import { ListeCommande } from './public/client/commande/liste-commande/liste-commande';
import { ProduitComponent } from './public/client/produit-component/produit-component';
import { PanierComponent } from './public/client/panier-component/panier-component';
import { FidelitesComponent } from './public/fidelites/fidelites.component';
import { EngagementsComponent } from './public/engagements/engagements.component';
import { CartComponent } from './public/cart/cart.component';
import { AdminComponent } from './admin/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut
  { path: 'home', component: IndexComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'livraison', component: LivraisonComponent },

  { path: 'magasins', component: MagasinsComponent },
  { path: 'promos', component: PromoComponent },
  { path: 'fidelites', component: FidelitesComponent },
  { path: 'engagements', component: EngagementsComponent },
  { path: 'avis', component: AvisClientsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'administration', component: AdminComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'auth/commande', component: ListeCommande },
  { path: 'auth/produit', component: ProduitComponent },
  { path: 'auth/panier', component: PanierComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
