import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

const WEDDING_TARGET = new Date('2026-08-11T19:00:00+02:00').getTime();

@Injectable({ providedIn: 'root' })
export class CountdownService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly now = signal(Date.now());

  private readonly remaining = computed(() => Math.max(0, WEDDING_TARGET - this.now()));

  readonly days = computed(() => Math.floor(this.remaining() / 86400000));
  readonly hours = computed(() => Math.floor((this.remaining() % 86400000) / 3600000));
  readonly mins = computed(() => Math.floor((this.remaining() % 3600000) / 60000));
  readonly secs = computed(() => Math.floor((this.remaining() % 60000) / 1000));

  constructor() {
    const timer = setInterval(() => this.now.set(Date.now()), 1000);
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }
}
