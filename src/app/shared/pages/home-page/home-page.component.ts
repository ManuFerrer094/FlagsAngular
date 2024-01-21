import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/countries/interfaces/country';
import { CountriesService } from 'src/app/countries/services/countries.service';


@Component({
  selector: 'shared-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public countries: Country[] = [];
  private countriesToShow = 24;
  private countriesPerPage = 24;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getCountries().subscribe(
      (allCountries: Country[]) => {
        // Ordenar los países por población de mayor a menor
        this.countries = allCountries.sort((a, b) => b.population - a.population).slice(0, this.countriesToShow);
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  loadMoreCountries(): void {
    this.countriesToShow += this.countriesPerPage;
    this.loadCountries();
  }
}
