import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../services/lang.service';

interface Flower {
  id: number;
  delay: number;
  duration: number;
  xStart: number;
  xEnd: number;
}

@Component({
  selector: 'app-blessing-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blessing-section.component.html',
  styleUrl: './blessing-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlessingSectionComponent implements OnInit {
  readonly lang = inject(LangService);
  flowers: Flower[] = [];

  ngOnInit(): void {
    this.generateFlowers();
  }

  private generateFlowers(): void {
    const flowerCount = 8;
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
