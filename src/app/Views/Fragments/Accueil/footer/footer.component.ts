import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  nomRestaurant:any
  email:any
  tel:any
  ngOnInit(): void {
    this.nomRestaurant= "Pizzeria, Plus qu'une pizza"
    this.email = "arijkahlaoui10@gmail.com"
    this.tel = "+216 23 145 687"
  }

}
