import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommande } from './liste-commande';

describe('ListeCommande', () => {
  let component: ListeCommande;
  let fixture: ComponentFixture<ListeCommande>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeCommande]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCommande);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
