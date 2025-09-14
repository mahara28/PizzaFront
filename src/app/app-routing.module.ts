import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisClientsComponent } from './public/avis-clients/avis-clients.component';
import { CartComponent } from './public/cart/cart.component';
import { EngagementsComponent } from './public/engagements/engagements.component';
import { FidelitesComponent } from './public/fidelites/fidelites.component';
import { IndexComponent } from './public/index/index.component';
import { MagasinsComponent } from './public/magasins/magasins.component';
import { MenuComponent } from './public/menu/menu.component';
import { PromoComponent } from './public/promo/promo.component';
import { LoginComponent } from './admin/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut
  { path: 'home', component: IndexComponent },
   { path: 'menu', component: MenuComponent },

  { path: 'magasins', component: MagasinsComponent },
  { path: 'promos', component: PromoComponent },
  { path: 'fidelites', component: FidelitesComponent },
  { path: 'engagements', component: EngagementsComponent },
  { path: 'avis', component: AvisClientsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin/login', component: LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
