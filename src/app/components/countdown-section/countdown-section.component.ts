import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../services/lang.service';
import { CountdownService } from '../../services/countdown.service';

interface Flower {
  id: number;
  delay: number;
  duration: number;
  xStart: number;
  xEnd: number;
}

@Component({
  selector: 'app-countdown-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown-section.component.html',
  styleUrl: './countdown-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownSectionComponent implements OnInit {
  readonly lang = inject(LangService);
  readonly countdown = inject(CountdownService);
  flowers: Flower[] = [];

  ngOnInit(): void {
    this.generateFlowers();
  }

  private generateFlowers(): void {
    const flowerCount = 4;
    for (let i = 0; i < flowerCount; i++) {
      this.flowers.push({
        id: i,
        delay: Math.random() * 1.5,
        duration: 4 + Math.random() * 3,
        xStart: Math.random() * 100,
        xEnd: Math.random() * 100,
      });
    }
  }
}
