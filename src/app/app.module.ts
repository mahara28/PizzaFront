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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonDirective, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { ConnexionComponent } from './public/index/connexion/connexion.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListeCommande } from './public/client/commande/liste-commande/liste-commande';
import { ProduitComponent } from './public/client/produit-component/produit-component';
import { PanierComponent } from './public/client/panier-component/panier-component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    ConnexionComponent,
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
    ListeCommande,
    ProduitComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.CLIENT_ID_GOOGLE  
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }


/*{
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // garde false pour ne pas reconnecter automatiquement
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '895808675441-q8s1822o7cr7iopna7gohta6h9ge98ss.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              'TON_APP_ID_FACEBOOK'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }*/