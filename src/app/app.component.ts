import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AudioService } from './core/services/audio.service';
import { LanguageService } from './core/services/language.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'independence-day-app';
  t: any = {};
  private sub: Subscription;
  private routerSub: Subscription;

  constructor(
    public audioService: AudioService, 
    public langService: LanguageService,
    private router: Router
  ) {
    this.sub = this.langService.translations$.subscribe(t => this.t = t);
    
    // Scroll to top on every route change
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Use setTimeout to ensure the DOM has updated before scrolling
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
    });
  }

  ngOnInit(): void {
    // Attempt to play audio on load (browsers might block this until interaction)
    setTimeout(() => {
      // this.audioService.togglePlay(); // Uncomment if you want auto-play, usually bad UX though
    }, 1000);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  // Fallback to start audio on first click anywhere if it hasn't started
  @HostListener('document:click', ['$event'])
  onFirstClick() {
    this.audioService.playClickSound(); // Just to initialize audio context
  }
}
