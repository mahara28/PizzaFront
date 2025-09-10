import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminComponent } from './admin/admin/admin.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { TopbarComponent } from './admin/topbar/topbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvisClientsComponent } from './public/avis-clients/avis-clients.component';
import { CartComponent } from './public/cart/cart.component';
import { EngagementsComponent } from './public/engagements/engagements.component';
import { FidelitesComponent } from './public/fidelites/fidelites.component';
import { CopyRightComponent } from './public/fragments/copy-right/copy-right.component';
import { FooterComponent } from './public/fragments/footer/footer.component';
import { HeaderComponent } from './public/fragments/header/header.component';
import { IndexComponent } from './public/index/index.component';
import { MagasinsComponent } from './public/magasins/magasins.component';
import { MenuComponent } from './public/menu/menu.component';
import { PromoComponent } from './public/promo/promo.component';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
