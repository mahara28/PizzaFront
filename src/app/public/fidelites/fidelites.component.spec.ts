import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelitesComponent } from './fidelites.component';

describe('FidelitesComponent', () => {
  let component: FidelitesComponent;
  let fixture: ComponentFixture<FidelitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FidelitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidelitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
