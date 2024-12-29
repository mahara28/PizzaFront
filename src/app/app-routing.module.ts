import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './Views/Composants/accueil/accueil.component';
import { LoginComponent } from './Views/Composants/login/login.component';

const routes: Routes = [
  {
    path :'',
    component: AccueilComponent
  },
  {
    path :'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
