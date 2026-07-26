import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LangService } from '../../services/lang.service';
import { AppStateService } from '../../services/app-state.service';
import { PlaybackService } from '../../services/playback.service';

@Component({
  selector: 'app-intro-overlay',
  standalone: true,
  templateUrl: './intro-overlay.component.html',
  styleUrl: './intro-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('doorLeft', [
      state('closed', style({ transform: 'translateX(0%)' })),
      state('open', style({ transform: 'translateX(-102%)' })),
      transition('closed => open', animate('1.3s cubic-bezier(0.65,0,0.35,1)')),
    ]),
    trigger('doorRight', [
      state('closed', style({ transform: 'translateX(0%)' })),
      state('open', style({ transform: 'translateX(102%)' })),
      transition('closed => open', animate('1.3s cubic-bezier(0.65,0,0.35,1)')),
    ]),
    trigger('lockFade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('0.6s ease')),
    ]),
  ],
})
export class IntroOverlayComponent {
  readonly lang = inject(LangService);
  readonly appState = inject(AppStateService);
  private readonly playback = inject(PlaybackService);

  readonly overlayVisible = signal(true);

  readonly doorState = computed<'closed' | 'open'>(() => (this.appState.opened() ? 'open' : 'closed'));
  readonly lockState = computed<'visible' | 'hidden'>(() =>
    this.appState.opened() ? 'hidden' : 'visible'
  );

  openDoors(): void {
    this.appState.openDoors();
    this.playback.play();
  }

  onDoorAnimationDone(): void {
    if (this.appState.opened()) {
      this.overlayVisible.set(false);
    }
  }
}
