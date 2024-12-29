import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './Views/Fragments/Accueil/header/header.component';
import { FooterComponent } from './Views/Fragments/Accueil/footer/footer.component';
import { AccueilComponent } from './Views/Composants/accueil/accueil.component';
import { LoginComponent } from './Views/Composants/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
