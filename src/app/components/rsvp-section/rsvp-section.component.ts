import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LangService } from '../../services/lang.service';

type Attending = 'yes' | 'no' | null;

@Component({
  selector: 'app-rsvp-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rsvp-section.component.html',
  styleUrl: './rsvp-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RsvpSectionComponent {
  readonly lang = inject(LangService);

  readonly rsvpName = signal('');
  readonly rsvpAttending = signal<Attending>(null);
  readonly rsvpGuests = signal(1);
  readonly rsvpSubmitted = signal(false);

  readonly showGuestsField = computed(() => this.rsvpAttending() === 'yes');

  setAttendingYes(): void {
    this.rsvpAttending.set('yes');
  }

  setAttendingNo(): void {
    this.rsvpAttending.set('no');
  }

  onGuestsChange(value: string): void {
    this.rsvpGuests.set(Math.max(1, parseInt(value, 10) || 1));
  }

  submit(event: Event): void {
    event.preventDefault();
    this.rsvpSubmitted.set(true);
  }
}
