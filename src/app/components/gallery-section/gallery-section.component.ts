import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-gallery-section',
  standalone: true,
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GallerySectionComponent {
  readonly lang = inject(LangService);
  readonly photos = [5, 4,3, 6,1, 2].map((n) => `assets/gallery/photo-${n}.jpg`);
}
