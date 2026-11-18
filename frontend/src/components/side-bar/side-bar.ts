import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
  host: {
    '[class.collapsed]': 'collapsed()',
  },
})
export class SideBar {
  readonly collapsed = signal(false);

  readonly items: NavItem[] = [
    { label: 'Főoldal', route: '/', icon: 'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z' },
    {
      label: 'Termékek',
      route: '/products',
      icon: 'M20 7 12 3 4 7v10l8 4 8-4zM4 7l8 4 8-4M12 11v10',
      disabled: false,
    },
    {
      label: 'Nyugta feltöltése',
      route: '/upload-receipt',
      icon: 'M12 15V4M7 9l5-5 5 5M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4',
      disabled: false,
    },
    {
      label: 'Naptár terv',
      route: '/calendar-plan',
      icon: 'M4 6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14H4zM4 10h16M8 3v4M16 3v4',
      disabled: false,
    },
  ];

  toggle() {
    this.collapsed.update((v) => !v);
  }
}
