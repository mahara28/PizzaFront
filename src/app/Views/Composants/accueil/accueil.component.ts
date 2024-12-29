import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as Isotope from 'isotope-layout';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit, AfterViewInit{
  private isotope: Isotope | undefined;
  slides = [
    {
      img: 'assets/img/events-slider/events-slider-1.jpg',
      title: 'Birthday Parties',
      price: '$189',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      img: 'assets/img/events-slider/events-slider-2.jpg',
      title: 'Private Parties',
      price: '$290',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      img: 'assets/img/events-slider/events-slider-3.jpg',
      title: 'Custom Parties',
      price: '$99',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  ngAfterViewInit(): void {
    AOS.init();
    // Sélectionnez le conteneur des éléments
    const gridElement = this.el.nativeElement.querySelector('.isotope-container');

    // Initialisez Isotope
    this.isotope = new Isotope(gridElement, {
      itemSelector: '.isotope-item',
      layoutMode: 'masonry', // Ou 'fitRows' selon vos besoins
    });
  }
  email:any
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    
    this.email = "arijkahlaoui10@gmail.com"
  }
  filter(filter: string): void {
    if (this.isotope) {
      this.isotope.arrange({ filter });
    }
  }

}
