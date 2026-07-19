import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalSymbolsComponent } from './national-symbols.component';

describe('NationalSymbolsComponent', () => {
  let component: NationalSymbolsComponent;
  let fixture: ComponentFixture<NationalSymbolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
      imports: [NationalSymbolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalSymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
