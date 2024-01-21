import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ["./country-page.component.css"],
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  zoom: number | null = 12;
  center: google.maps.LatLngLiteral | null = null;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 10);
      }
    });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe((country) => {
        if (!country) {
          this.router.navigateByUrl('');
          return;
        }
        this.country = country;

        this.updateMapProperties();
      });

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  getBorderFlagUrl(countryCode: string): string | null {
    return this.countriesService.getBorderFlagUrl(countryCode);
  }

  getCountryName(countryCode: string): string {
    return this.countriesService.getCountryNameByCode(countryCode) || countryCode;
  }

  formatAsJson(value: any): string {
    return value ? JSON.stringify(value) : 'Not available';
  }

  zoomIn() {
    if (this.zoom && this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom && this.options.minZoom) this.zoom--;
  }

  private updateMapProperties(): void {
    if (this.country && this.country.latlng) {
      this.zoom = 10;
      this.center = {
        lat: this.country.latlng[0] || 0,
        lng: this.country.latlng[1] || 0,
      };
      this.options = {
        mapTypeId: 'hybrid',
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        maxZoom: 15,
        minZoom: 8,
      };
    }
  }

  startsWithVowel(str: string): boolean {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const firstChar = str.charAt(0).toLowerCase();
    return vowels.includes(firstChar);
  }

downloadImage(url: string | undefined, filename: string): void {
  if (url) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.click();
      })
      .catch(error => console.error('Error al descargar la imagen:', error));
  }
}

getTranslationWithCountry(languageCode: string): string {
  const languageNames: { [key: string]: string } = {
    'ara': 'Arabic',
    'bre': 'Breton',
    'ces': 'Czech',
    'cym': 'Welsh',
    'deu': 'German',
    'est': 'Estonian',
    'fin': 'Finnish',
    'fra': 'French',
    'hrv': 'Croatian',
    'hun': 'Hungarian',
    'ita': 'Italian',
    'jpn': 'Japanese',
    'kor': 'Korean',
    'nld': 'Dutch',
    'per': 'Persian',
    'pol': 'Polish',
    'por': 'Portuguese',
    'rus': 'Russian',
    'slk': 'Slovak',
    'spa': 'Spanish',
    'srp': 'Serbian',
    'swe': 'Swedish',
    'tur': 'Turkish',
    'urd': 'Urdu',
    'zho': 'Chinese',
  };

  if (!this.country || !this.country.name || !this.country.translations || !this.country.translations[languageCode]) {
    return '';
  }

  const languageName = languageNames[languageCode] || languageCode;

  return `${languageName}: ${this.country.translations[languageCode].common} `;
}

isCountryDefined(): boolean {
  return !!this.country && !!this.country.borders;
}

isNotAvailable(value: any): boolean {
  return value === 'Not available' || value === undefined || value === null;
}

}
