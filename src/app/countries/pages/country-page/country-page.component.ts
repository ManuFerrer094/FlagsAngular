import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';
import ClipboardJS from 'clipboard';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [`
  .scroll-container {
    max-height: 1500px;
    overflow-y: auto;
  }

  .neighbor-link {
    display: block;
    margin-bottom: 10px;
  }

  .badge {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .img {
    border: 1px solid lightgray;
  }
  button.btn.btn-primary {
    margin-right: 1%;
    margin-left: 1%;
}
h3 {
  margin-top: 2%;
  margin-bottom: 2%;
}
.bg-green {
  background-color: green;
  color: white;
  border-radius: 5px;
  padding: 2px;
}

.bg-red {
  background-color: red;
  color: white;
  border-radius: 5px;
  padding: 2px;
}

.bg-left {
  background-color: #FF6347;
  color: white;
  border-radius: 5px;
  padding: 2px;
}

.bg-right {
  background-color: #00BFFF;
  color: white;
  border-radius: 5px;
  padding: 2px;
}
.flag-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border: 1px solid lightgray;
}

.flag-icon-container {
  display: flex;
  align-items: center;
}

.flag-icon-text {
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
}

.flag-icon {
  width: 30px;
  height: 20px;

}


.table-list {
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}


.list-group-item {
  display: table-row;
}


.flag-container {
  display: table-cell;
  padding: 10px;
}


.flag-text {
  text-align: left;
}

strong {
    font-style: italic;
    font-size: 1rem;
}

.icon-btn {
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
}


.icon-btn i {
  font-size: 1.2rem;
  margin-right: 5px;
}


.list-group-item:nth-child(even) {
  background-color: #f8f9fa;
}


.list-group-item:nth-child(odd) {
  background-color: #e9ecef;
}

.thumbnail {
  max-width: 50px; /* Ancho máximo de la miniatura */
  max-height: 50px; /* Altura máxima de la miniatura */
  margin-right: 10px; /* Espaciado a la derecha de la miniatura */
  border: 1px solid #ddd; /* Borde alrededor de la miniatura */
  border-radius: 4px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.fixed-column {
  position: sticky;
  top: 0;
  height: 100%; /* Esto hace que la columna ocupe el 100% de la altura del viewport */
  overflow-y: auto; /* Agrega un desplazamiento vertical si el contenido es demasiado largo */
}

.container.flag-container {
  padding: 15px; /* Ajusta el relleno según sea necesario */
}

/* Estilo para el tooltip */
img[title] {
  position: relative;
}

/* Estilo del texto del tooltip */
img[title]:hover::after {
  content: attr(title);
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
}

/**Mobile **/
@media (max-width: 767px) {
  .col-8,
  .col-4 {
    width: 100%;
    float: none;
  }

  .fixed-column {
    position: relative;
  }

  .list-group-item {
    border: 1px solid #ddd;
  }

  .list-group-item strong {
    display: block;
    margin-bottom: 5px;
  }

  .scroll-container {
    max-height: none;
    overflow-y: visible;
  }

  .neighbor-link {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .badge {
    margin: 5px;
  }
  .list-group-item a {
    word-break: break-all;
  }
}

  `],
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
        // Retrasar el desplazamiento en 100 ms (ajusta según sea necesario)
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

  const countryName = this.country.name.common;
  const languageName = languageNames[languageCode] || languageCode;

  return `${languageName}: ${this.country.translations[languageCode].common} `;
}

isCountryDefined(): boolean {
  return !!this.country && !!this.country.borders;
}

copyToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
}
