import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
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
    MatButton,
    MatIcon,
    MatList,
    MatNavList,
    MatListItem,
  ],
  template: `
    <mat-sidenav-container class="app-container">
      <mat-sidenav
        #drawer
        [mode]="isLargeScreen() ? 'side' : 'over'"
        [opened]="isLargeScreen()"
        class="app-sidenav"
      >
        <mat-nav-list>
          <a mat-list-item routerLink="/products" (click)="drawer.toggle()"
            >Products</a
          >
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          @if (!isLargeScreen()) {
            <button
              type="button"
              mat-icon-button
              (click)="drawer.toggle()"
            >
              <mat-icon>menu</mat-icon>
            </button>
          }
          <span>Online Store</span>
        </mat-toolbar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
        <footer class="app-footer">&copy; 2024 Online Store</footer>
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
