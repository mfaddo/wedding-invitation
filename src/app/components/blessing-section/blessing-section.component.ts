import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-blessing-section',
  standalone: true,
  templateUrl: './blessing-section.component.html',
  styleUrl: './blessing-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlessingSectionComponent {
  readonly lang = inject(LangService);
}
