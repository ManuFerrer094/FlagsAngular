// footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styles: [
    `
    .footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 10px;
      position: fixed;
      bottom: 0;
    }
    `,
  ],
})
export class FooterComponent {}
