import { DestroyRef, Injectable, inject, signal } from '@angular/core';

const SCROLL_SPEED_PX_PER_FRAME = 0.6;
const SCROLL_START_DELAY_MS = 2500;
const MANUAL_SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);

@Injectable({ providedIn: 'root' })
export class PlaybackService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly audio = new Audio('assets/wedding-music.mp3');
  private rafId: number | null = null;
  private scrollStartTimeoutId: number | null = null;
  private video: HTMLVideoElement | null = null;

  readonly playing = signal(false);

  constructor() {
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.audio.preload = 'auto';

    // Get reference to video element
    setTimeout(() => {
      this.video = document.querySelector('video');
      if (this.video) {
        this.video.muted = true;
      }
    }, 0);

    window.addEventListener('wheel', this.handleManualInput, { passive: true });
    window.addEventListener('touchstart', this.handleManualInput, { passive: true });
    window.addEventListener('keydown', this.handleKeydown);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('wheel', this.handleManualInput);
      window.removeEventListener('touchstart', this.handleManualInput);
      window.removeEventListener('keydown', this.handleKeydown);
      this.cancelScheduledScrollStart();
      this.stopScrollLoop();
    });
  }

  play(): void {
    if (this.playing()) return;
    this.playing.set(true);
    this.audio.muted = false;
    this.audio.play().catch(() => {});

    // Start video playback
    if (!this.video) {
      this.video = document.querySelector('video');
    }
    if (this.video) {
      this.video.muted = true;
      this.video.play().catch(() => {});
    }

    this.scheduleScrollStart();
  }

  playAndScroll(): void {
    if (this.playing()) return;
    this.playing.set(true);
    this.audio.muted = false;
    this.audio.play().catch(() => {});

    // Start video playback
    if (!this.video) {
      this.video = document.querySelector('video');
    }
    if (this.video) {
      this.video.muted = true;
      this.video.play().catch(() => {});
    }

    this.startScrollLoop();
  }

  pause(): void {
    if (!this.playing()) return;
    this.playing.set(false);
    this.audio.pause();

    // Pause video
    if (this.video) {
      this.video.pause();
    }

    this.cancelScheduledScrollStart();
    this.stopScrollLoop();
  }

  toggle(): void {
    this.playing() ? this.pause() : this.play();
  }

  private handleManualInput = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('[data-playback-control]')) return;
    this.pause();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (!MANUAL_SCROLL_KEYS.has(event.key)) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('[data-playback-control]')) return;
    this.pause();
  };

  private startScrollLoop(): void {
    const step = (): void => {
      if (!this.playing()) return;
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 1;
      if (atBottom) {
        this.pause();
        return;
      }
      window.scrollBy(0, SCROLL_SPEED_PX_PER_FRAME);
      this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  }

  private stopScrollLoop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private scheduleScrollStart(): void {
    this.cancelScheduledScrollStart();
    this.scrollStartTimeoutId = window.setTimeout(() => {
      this.scrollStartTimeoutId = null;
      if (this.playing()) this.startScrollLoop();
    }, SCROLL_START_DELAY_MS);
  }

  private cancelScheduledScrollStart(): void {
    if (this.scrollStartTimeoutId !== null) {
      clearTimeout(this.scrollStartTimeoutId);
      this.scrollStartTimeoutId = null;
    }
  }
}
