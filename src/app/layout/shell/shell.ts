import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { Role } from '../../shared/models/role';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  roles?: Role[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Painel', icon: 'dashboard', route: '/dashboard' },
  { label: 'Livros', icon: 'menu_book', route: '/catalog/books' },
  { label: 'Exemplares', icon: 'inventory_2', route: '/copies' },
  { label: 'Usuários', icon: 'groups', route: '/patrons' },
  { label: 'Empréstimos', icon: 'swap_horiz', route: '/circulation/loans' },
  { label: 'Reservas', icon: 'bookmark', route: '/circulation/reservations' },
  { label: 'Multas', icon: 'payments', route: '/circulation/fines' },
  { label: 'Ocorrências', icon: 'report_problem', route: '/incidents' },
  { label: 'Relatórios', icon: 'assessment', route: '/reports' },
  { label: 'Regras', icon: 'tune', route: '/admin/rules', roles: [Role.Admin] },
  {
    label: 'Usuários internos',
    icon: 'admin_panel_settings',
    route: '/admin/internal-users',
    roles: [Role.Admin],
  },
  { label: 'Auditoria', icon: 'history', route: '/admin/audit', roles: [Role.Admin] },
];

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)="drawer.toggle()" aria-label="Alternar menu">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Biblioteca</span>

      <span class="spacer"></span>
      <!-- futuro: <app-global-search /> entra aqui -->

      <span class="user">{{ user()?.name }}</span>
      <button mat-icon-button (click)="logout()" aria-label="Sair">
        <mat-icon>logout</mat-icon>
      </button>
    </mat-toolbar>

    <mat-sidenav-container class="container">
      <mat-sidenav #drawer mode="side" opened class="sidenav">
        <mat-nav-list>
          @for (item of navItems(); track item.route) {
            <a mat-list-item [routerLink]="item.route" routerLinkActive="active">
              <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
              <span matListItemTitle>{{ item.label }}</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="content">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    :host { display: flex; flex-direction: column; height: 100vh; }
    .container { flex: 1; }
    .sidenav { width: 240px; }
    .content { padding: 24px; }
    .spacer { flex: 1; }
    .user { margin-right: 8px; font-size: 14px; }
  `,
})
export class Shell {
  private readonly auth = inject(AuthService);

  protected readonly user = this.auth.user;

  protected readonly navItems = computed(() =>
    NAV_ITEMS.filter((item) => !item.roles || this.auth.hasRole(...item.roles)),
  );

  protected logout(): void {
    this.auth.logout();
  }
}