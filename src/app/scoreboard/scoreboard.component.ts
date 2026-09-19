import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type Track = 'School' | 'LeetCode' | 'Udemy' | 'AlgoExpert' | 'Frontend Masters' | 'Projects' | 'Other';
type Player = {
  name: string;
  github: string;
  avatar: string;
  xp: number;
  streak: number;
  track: Track;
  progress: number;
  note: string;
};

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent {
  signedIn = false;

  readonly players: Player[] = [
    { name: 'Jamal', github: 'jamal-chukwuka', avatar: 'https://avatars.githubusercontent.com/u/80351494?v=4', xp: 430, streak: 3, track: 'School', progress: 42, note: 'LaunchCode' },
    { name: 'TJ', github: 'chucknezi', avatar: 'assets/tj-recess.jpg', xp: 275, streak: 2, track: 'Projects', progress: 30, note: 'Build progress' },
    { name: 'Caro', github: '', avatar: '', xp: 120, streak: 0, track: 'Other', progress: 0, note: 'Connect a GitHub repo' }
  ];

  readonly supportedTracks: Track[] = ['School', 'LeetCode', 'Udemy', 'AlgoExpert', 'Frontend Masters', 'Projects', 'Other'];

  get leaders(): Player[] {
    return [...this.players].sort((a, b) => b.xp - a.xp);
  }

  signIn(): void {
    this.signedIn = true;
  }

  signOut(): void {
    this.signedIn = false;
  }

  avatarError(event: Event, player: Player): void {
    const image = event.target as HTMLImageElement;
    image.style.display = 'none';
    const fallback = image.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = 'grid';
  }
}
