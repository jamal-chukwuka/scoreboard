import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from '@supabase/supabase-js';
import { SupabaseAuthService } from '../services/supabase-auth.service';

type Track = 'School' | 'LeetCode' | 'Udemy' | 'AlgoExpert' | 'Frontend Masters' | 'Projects' | 'Other';
type Player = { name: string; github: string; avatar: string; xp: number; streak: number; track: Track; progress: number; note: string; };

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  signedIn = false;
  authError = '';
  currentUser = '';
  private authSubscription?: { unsubscribe: () => void };

  readonly players: Player[] = [
    { name: 'Jamal', github: 'jamal-chukwuka', avatar: 'https://avatars.githubusercontent.com/u/80351494?v=4', xp: 430, streak: 3, track: 'School', progress: 42, note: 'LaunchCode' },
    { name: 'TJ', github: 'chucknezi', avatar: 'assets/tj-recess.jpg', xp: 275, streak: 2, track: 'Projects', progress: 30, note: 'Build progress' },
    { name: 'Caro', github: '', avatar: '', xp: 120, streak: 0, track: 'Other', progress: 0, note: 'Connect a GitHub repo' }
  ];

  readonly supportedTracks: Track[] = ['School', 'LeetCode', 'Udemy', 'AlgoExpert', 'Frontend Masters', 'Projects', 'Other'];

  constructor(private readonly auth: SupabaseAuthService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.applySession(await this.auth.getSession());
    } catch {
      this.authError = 'Could not restore your login session.';
    }
    const { data } = this.auth.onAuthStateChange(session => this.applySession(session));
    this.authSubscription = data.subscription;
  }

  ngOnDestroy(): void { this.authSubscription?.unsubscribe(); }

  get leaders(): Player[] { return [...this.players].sort((a, b) => b.xp - a.xp); }

  async signIn(): Promise<void> {
    this.authError = '';
    try { await this.auth.signInWithGitHub(); }
    catch { this.authError = 'GitHub sign-in could not start. Check the Supabase GitHub provider and redirect URL.'; }
  }

  async signOut(): Promise<void> {
    this.authError = '';
    try { await this.auth.signOut(); }
    catch { this.authError = 'Could not sign out. Please try again.'; }
  }

  avatarError(event: Event, _player: Player): void {
    const image = event.target as HTMLImageElement;
    image.style.display = 'none';
    const fallback = image.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = 'grid';
  }

  private applySession(session: any): void {
    this.signedIn = !!session;
    const profile = this.auth.githubProfile(session?.user);
    this.currentUser = this.signedIn ? (profile.github ? '@' + profile.github : profile.name) : '';
  }
}
