import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type Activity = {
  date: string;
  title: string;
  detail: string;
  xp: number;
};

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent {
  // Public-facing pilot data. The private learning model that awards XP lives outside this UI.
  readonly totalXp = 430;
  readonly level = 4;
  readonly streak = 3;
  readonly sectionsCompleted = 5;
  readonly courseProgress = 42;
  readonly nextLevelXp = 500;

  readonly activities: Activity[] = [
    { date: 'Sep 19', title: 'Arrays', detail: 'Section completed', xp: 90 },
    { date: 'Sep 19', title: 'Objects Behind the Scenes', detail: 'Practice completed', xp: 120 },
    { date: 'Sep 18', title: 'Objects', detail: 'Course progress', xp: 80 },
    { date: 'Sep 17', title: 'JavaScript Foundations', detail: 'Practice session', xp: 70 },
    { date: 'Sep 16', title: 'JavaScript Foundations', detail: 'Course progress', xp: 70 }
  ];

  get levelProgress(): number {
    return Math.min(100, Math.round((this.totalXp / this.nextLevelXp) * 100));
  }
}
