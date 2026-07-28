import { ChangeDetectionStrategy, Component, computed, inject, signal, AfterViewInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LangService } from '../../services/lang.service';
import { AppStateService } from '../../services/app-state.service';
import { PlaybackService } from '../../services/playback.service';

@Component({
  selector: 'app-intro-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-overlay.component.html',
  styleUrl: './intro-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flapOpen', [
      state('closed', style({ transform: 'rotateX(0deg) translateX(-50%)' })),
      state('open', style({ transform: 'rotateX(-180deg) translateX(-50%)' })),
      transition('closed => open', animate('2.2s cubic-bezier(0.65,0,0.35,1)')),
    ]),
    trigger('contentFade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('0.6s ease-in')),
    ]),
    trigger('overlayFade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('1s ease-out')),
    ]),
  ],
})
export class IntroOverlayComponent implements AfterViewInit {
  readonly lang = inject(LangService);
  readonly appState = inject(AppStateService);
  private readonly playback = inject(PlaybackService);
  private readonly destroyRef = inject(DestroyRef);

  readonly overlayVisible = signal(true);
  readonly overlayFading = signal(false);
  readonly sealFontFamily = computed(() =>
    this.lang.isRtl() ? "'Amiri', 'Traditional Arabic', serif" : this.lang.fontHeading()
  );

  readonly flapState = computed<'closed' | 'open'>(() => (this.appState.opened() ? 'open' : 'closed'));
  readonly contentState = computed<'visible' | 'hidden'>(() =>
    this.appState.opened() ? 'hidden' : 'visible'
  );
  readonly overlayState = computed<'visible' | 'hidden'>(() =>
    this.overlayFading() ? 'hidden' : 'visible'
  );

  ngAfterViewInit(): void {
    const handleClick = () => {
      if (!this.appState.opened()) {
        this.openEnvelope();
        document.removeEventListener('click', handleClick);
      }
    };

    document.addEventListener('click', handleClick);

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('click', handleClick);
    });
  }

  openEnvelope(): void {
    this.appState.openDoors();
  }

  onFlapAnimationDone(): void {
    if (this.appState.opened()) {
      this.overlayFading.set(true);
      setTimeout(() => {
        this.overlayVisible.set(false);
        this.playback.playAndScroll();
      }, 1000);
    }
  }
}
