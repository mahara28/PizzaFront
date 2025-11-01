import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './public/fragments/header/header.component';
import { FooterComponent } from './public/fragments/footer/footer.component';
import { IndexComponent } from './public/index/index.component';
import { MenuComponent } from './public/menu/menu.component';
import { MagasinsComponent } from './public/magasins/magasins.component';
import { PromoComponent } from './public/promo/promo.component';
import { FidelitesComponent } from './public/fidelites/fidelites.component';
import { EngagementsComponent } from './public/engagements/engagements.component';
import { CopyRightComponent } from './public/fragments/copy-right/copy-right.component';
import { AvisClientsComponent } from './public/avis-clients/avis-clients.component';
import { CartComponent } from './public/cart/cart.component';
import { LivraisonComponent } from './public/livraison/livraison.component';
import { TopbarComponent } from './admin/topbar/topbar.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    MenuComponent,
    MagasinsComponent,
    PromoComponent,
    FidelitesComponent,
    EngagementsComponent,
    CopyRightComponent,
    AvisClientsComponent,
    CartComponent,
    AdminComponent,
    SidebarComponent,
    TopbarComponent,
    LivraisonComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
