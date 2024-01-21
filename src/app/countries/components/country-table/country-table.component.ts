import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `img {
      width: 25px;
    }
    .alert-card {
      background-color: #ffeaa7;
      border: 1px solid #fdcb6e;
      margin-bottom: 16px;
    }
    `
  ]
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] = [];


}
