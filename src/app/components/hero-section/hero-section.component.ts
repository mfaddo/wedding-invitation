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
    () => 'https://www.google.com/maps/place/%D9%82%D8%A7%D8%B9%D8%A7%D8%AA+%D9%82%D8%B5%D8%B1+%D8%A7%D9%84%D8%A7%D9%85%D9%8A%D8%B1%D8%A7%D8%AA+%D9%84%D9%84%D8%AD%D9%81%D9%84%D8%A7%D8%AA%E2%80%AD/@30.0516889,31.3232453,17z/data=!3m1!4b1!4m6!3m5!1s0x14583fd0e6d180f3:0x9c41f83c0dc4f82f!8m2!3d30.0516889!4d31.3258202!16s%2Fg%2F11s_xs54ph?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D'
  );
}
