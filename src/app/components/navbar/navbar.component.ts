import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/services/audio.service';
import { LanguageService } from '../../core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {
  isScrolled = false;
  isMenuOpen = false;
  t: any = {};
  private sub: Subscription;

  constructor(
    public audioService: AudioService,
    public langService: LanguageService
  ) {
    this.sub = this.langService.translations$.subscribe(t => this.t = t);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onNavClick() {
    this.isMenuOpen = false;
    this.audioService.playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleLanguage() {
    this.langService.toggleLanguage();
    this.audioService.playClickSound();
  }
}
