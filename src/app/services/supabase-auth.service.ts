import { Injectable } from '@angular/core';
import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yalhrfkebtbzqsfrqlog.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'EKxYxRfFQGtz5ntiFu8htnYEgAwQNp3pOXAMVpXxhzQoyxw8fhoVWR7mxKF2K2k3eP8bDqEuOgoG94WUYec6bw==';

@Injectable({ providedIn: 'root' })
export class SupabaseAuthService {
  private readonly supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

  async getSession(): Promise<Session | null> {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  onAuthStateChange(callback: (session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange((_event, session) => callback(session));
  }

  async signInWithGitHub(): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  githubProfile(user: User | undefined) {
    const metadata = user?.user_metadata ?? {};
    return {
      name: metadata['full_name'] ?? metadata['name'] ?? metadata['user_name'] ?? 'GitHub player',
      github: metadata['user_name'] ?? metadata['preferred_username'] ?? '',
      avatar: metadata['avatar_url'] ?? ''
    };
  }
}
