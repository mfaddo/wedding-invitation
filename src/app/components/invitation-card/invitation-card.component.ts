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

  getFamilyLine(): { line1: string; families: { right: string; left: string }; line3: string } {
    if (this.lang.isRtl()) {
      return {
        line1: 'على أنغام الفرح وتحت سماء تزينها السعادة بكل الحب يسر',
        families: { right: 'ال فضو', left: 'ال الملحم' },
        line3: 'أن يدعوكم لحفل زفاف نجليهما',
      };
    }
    return {
      line1: 'To the melodies of joy and under skies adorned with happiness, with all our love,',
      families: { right: 'the Faddo', left: 'and Al Melhem families' },
      line3: 'joyfully invite you to the wedding celebration of their children',
    };
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
