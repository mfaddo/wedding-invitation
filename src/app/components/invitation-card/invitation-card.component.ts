import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';

const LEAF_COUNT = 22;
const LEAF_RADIUS_PX = 137;
const LEAF_COLORS = ['#8FA876', '#A9BE8F', '#7C976A'];

interface LeafStyle {
  background: string;
  transform: string;
}

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  templateUrl: './invitation-card.component.html',
  styleUrl: './invitation-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationCardComponent {
  readonly lang = inject(LangService);

  readonly leaves: LeafStyle[] = Array.from({ length: LEAF_COUNT }, (_, i) => {
    const angle = (360 / LEAF_COUNT) * i;
    const color = LEAF_COLORS[i % 3];
    return {
      background: `linear-gradient(135deg, ${color}, #6E8759)`,
      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${LEAF_RADIUS_PX}px) rotate(45deg)`,
    };
  });
}
