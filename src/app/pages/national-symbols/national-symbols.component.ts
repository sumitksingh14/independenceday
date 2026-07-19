import { Component, OnDestroy } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-national-symbols',
  standalone: true,
  imports: [],
  templateUrl: './national-symbols.component.html',
  styleUrl: './national-symbols.component.scss'
})
export class NationalSymbolsComponent implements OnDestroy {
  t: any = {};
  private sub: Subscription;

  constructor(public langService: LanguageService) {
    this.sub = this.langService.translations$.subscribe(t => this.t = t);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
