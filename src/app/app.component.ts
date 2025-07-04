import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatListModule,
  MatNavList
} from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    MatIcon,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatIconButton,
  ],

  template: `
    <mat-sidenav-container>
      <mat-sidenav
        #drawer
        [mode]="isLargeScreen() ? 'side' : 'over'"
        [opened]="isLargeScreen()"
        class="app-sidenav">
        <h1>Online Store</h1>
        <mat-nav-list>
          <mat-list-item>
            <a matListItemTitle routerLink="/products">Products</a>
            <mat-icon matListItemIcon>home</mat-icon>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          @if (!isLargeScreen()) {
            <button
              type="button"
              mat-icon-button
              (click)="drawer.toggle()">
              <mat-icon>menu</mat-icon>
            </button>
          }
        </mat-toolbar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
        <footer class="footer">&copy; 2024 Online Store</footer>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class AppComponent {
  private breakpoint = inject(BreakpointObserver);
  isLargeScreen = signal(false);

  constructor() {
    this.breakpoint
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        this.isLargeScreen.set(result.matches);
      });
  }
}
