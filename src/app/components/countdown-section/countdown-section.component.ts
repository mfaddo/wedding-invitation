import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { CountdownService } from '../../services/countdown.service';

@Component({
  selector: 'app-countdown-section',
  standalone: true,
  templateUrl: './countdown-section.component.html',
  styleUrl: './countdown-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownSectionComponent {
  readonly lang = inject(LangService);
  readonly countdown = inject(CountdownService);
}
