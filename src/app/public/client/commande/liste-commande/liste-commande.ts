import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/public/services/menu.service';

@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.html',
  styleUrls:['./liste-commande.scss']
})
export class ListeCommande implements OnInit{
  jwtToken:any
  constructor(private _menu:MenuService){}
  ngOnInit(): void {
    this.jwtToken = localStorage.getItem("jwtToken")
    console.log(sessionStorage.getItem("userInfo"))
  }

}
