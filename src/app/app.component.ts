import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from './services/lang.service';
import { AppStateService } from './services/app-state.service';
import { PlaybackService } from './services/playback.service';
import { IntroOverlayComponent } from './components/intro-overlay/intro-overlay.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { CountdownSectionComponent } from './components/countdown-section/countdown-section.component';
import { InvitationCardComponent } from './components/invitation-card/invitation-card.component';
import { GallerySectionComponent } from './components/gallery-section/gallery-section.component';
import { BlessingSectionComponent } from './components/blessing-section/blessing-section.component';
import { LocationSectionComponent } from './components/location-section/location-section.component';
import { RsvpSectionComponent } from './components/rsvp-section/rsvp-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IntroOverlayComponent,
    HeroSectionComponent,
    CountdownSectionComponent,
    InvitationCardComponent,
    GallerySectionComponent,
    BlessingSectionComponent,
    LocationSectionComponent,
    RsvpSectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly lang = inject(LangService);
  readonly appState = inject(AppStateService);
  readonly playback = inject(PlaybackService);
}
