import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  readonly opened = signal(false);

  openDoors(): void {
    this.opened.set(true);
  }

  scrollToRsvp(): void {
    document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
