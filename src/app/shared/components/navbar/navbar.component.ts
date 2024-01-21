import { Component } from '@angular/core';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
    nav.navbar {
      background-color: #2980b9;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    }

    nav.navbar a.navbar-brand,
    nav.navbar a.navbar-nav .nav-link {
      color: white;
      transition: color 0.3s;
    }

    .nav-link:hover {
      color: #ecf0f1;
      cursor: pointer;
    }

    nav.navbar-toggler-icon {
      background-color: white;
    }

    nav.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
      background-color: #ecf0f1;
    }
    `,
  ],
})
export class NavbarComponent {
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
