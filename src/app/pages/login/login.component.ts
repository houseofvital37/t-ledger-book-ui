import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="login-shell">
      <form class="login-card" (ngSubmit)="submit()">
        <div class="brand">VITAL <span>LEDGER</span></div>
        <h1>Sign in</h1>
        <p class="subtitle">Use your Ledger Book account credentials.</p>
        <label for="username">Username</label>
        <input id="username" name="username" [(ngModel)]="username" autocomplete="username" required maxlength="100" />
        <label for="password">Password</label>
        <input id="password" name="password" [(ngModel)]="password" type="password" autocomplete="current-password" required maxlength="128" />
        <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>
        <button type="submit" [disabled]="loading || !username || !password">{{ loading ? 'Signing in…' : 'Sign in' }}</button>
      </form>
    </main>
  `,
  styles: [`
    .login-shell{min-height:100vh;display:grid;place-items:center;background:#f4f7fb;padding:24px}
    .login-card{width:min(100%,420px);padding:36px;background:#fff;border:1px solid #e5eaf1;border-radius:14px;box-shadow:0 12px 40px #172b4d12;display:flex;flex-direction:column;gap:12px}
    .brand{font-size:20px;font-weight:800;letter-spacing:1px;color:#15243b}.brand span{color:#1769e0}
    h1{font-size:26px;margin:12px 0 0;color:#15243b}.subtitle{margin:0 0 12px;color:#68768a}
    label{font-size:13px;font-weight:600;color:#37465c}input{height:42px;border:1px solid #ccd5e1;border-radius:7px;padding:0 12px;outline:none}input:focus{border-color:#1769e0;box-shadow:0 0 0 3px #1769e01a}
    button{height:44px;border:0;border-radius:7px;background:#1769e0;color:white;font-weight:700;margin-top:10px;cursor:pointer}button:disabled{opacity:.55;cursor:default}.error{margin:4px 0 0;color:#c0392b;font-size:13px}
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private readonly auth: AuthService, private readonly router: Router, private readonly route: ActivatedRoute) {}

  submit(): void {
    if (this.loading || !this.username.trim() || !this.password) return;
    this.loading = true;
    this.errorMessage = '';
    this.auth.login(this.username.trim(), this.password).subscribe({
      next: () => {
        this.loading = false;
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(returnUrl?.startsWith('/') ? returnUrl : '/dashboard');
      },
      error: error => {
        this.loading = false;
        this.auth.logout();
        this.errorMessage = error?.error?.message || error?.error?.detail || error?.message || 'Unable to sign in.';
      }
    });
  }
}
