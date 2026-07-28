import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../services/lang.service';

const LEAF_COUNT = 22;
const LEAF_RADIUS_PX = 137;
const LEAF_COLORS = ['#DAA899', '#DAA899', '#DAA899'];

interface LeafStyle {
  background: string;
  transform: string;
}

interface Flower {
  id: number;
  delay: number;
  duration: number;
  xStart: number;
  xEnd: number;
}

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitation-card.component.html',
  styleUrl: './invitation-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationCardComponent implements OnInit {
  readonly lang = inject(LangService);
  flowers: Flower[] = [];

  readonly leaves: LeafStyle[] = Array.from({ length: LEAF_COUNT }, (_, i) => {
    const angle = (360 / LEAF_COUNT) * i;
    const color = LEAF_COLORS[i % 3];
    return {
      background: `linear-gradient(135deg, ${color}, #9D7B6A)`,
      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${LEAF_RADIUS_PX}px) rotate(45deg)`,
    };
  });

  ngOnInit(): void {
    this.generateFlowers();
  }

  private generateFlowers(): void {
    const flowerCount = 6;
    for (let i = 0; i < flowerCount; i++) {
      this.flowers.push({
        id: i,
        delay: Math.random() * 2,
        duration: 8 + Math.random() * 6,
        xStart: Math.random() * 100,
        xEnd: Math.random() * 100,
      });
    }
  }
}
