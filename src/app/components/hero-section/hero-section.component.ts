import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  readonly lang = inject(LangService);

  readonly mapHref = computed(
    () => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(this.lang.t().address)
  );
}
