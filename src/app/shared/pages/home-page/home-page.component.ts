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
  private allCountries: Country[] = [];
  private countriesToShow = 24;
  private countriesPerPage = 24;
  sortBy: string = 'population';
  descending: boolean = true;
  selectedRegion: string | null = null;
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getCountries().subscribe(
      (allCountries: Country[]) => {
        this.allCountries = allCountries;

        // Ordenar por población de mayor a menor por defecto
        this.sortBy = 'population';
        this.descending = true;

        // Aplicar el filtro
        this.applyFilter();
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  loadMoreCountries(): void {
    this.countriesToShow += this.countriesPerPage;

    this.applyFilter();
  }

  filterBySize(descending: boolean): void {
    this.sortBy = 'size';
    this.descending = descending;
    this.applyFilter();
  }

  filterByPopulation(descending: boolean): void {
    this.sortBy = 'population';
    this.descending = descending;
    this.applyFilter();
  }

  // New function to filter countries by region
  filterByRegion(region: string | null): void {
    this.selectedRegion = region;
    this.applyFilter();
  }

  private applyFilter(): void {
    let filteredList = [...this.allCountries];

    // Apply additional region filter if selected
    if (this.selectedRegion) {
      filteredList = filteredList.filter(country => country.region === this.selectedRegion);
    }

    filteredList = filteredList.sort((a, b) => {
      const valueA = this.getValueToCompare(a);
      const valueB = this.getValueToCompare(b);
      return this.descending ? valueB - valueA : valueA - valueB;
    });

    this.countries = filteredList.slice(0, this.countriesToShow);
  }

  private getValueToCompare(country: Country): number {


    return country.population || 0;
  }

  clearAllFilters(): void {
    location.reload();
  }

}
