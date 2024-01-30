describe('Testing Country Pages', () => {
  it('Should successfully visit each country page, check for h1 and country image, and download content for all download buttons', () => {
    const validCountryCodes: string[] = [];
    const missingElements: { countryCode: string, missingElements: string[] }[] = [];
    const failedDownloads: string[] = [];

    cy.request<any[]>('https://restcountries.com/v3.1/all').then(response => {
      expect(response.status).to.eq(200);
      response.body.forEach((country: any) => {
        const countryCode = country?.cca2;
        if (countryCode && countryCode.length === 3) {
          validCountryCodes.push(countryCode);
        }
      });
      validCountryCodes.forEach(countryCode => {
        const countryUrl = `https://ngcountries.netlify.app/countries/by/${countryCode}`; // Construir la URL del país

        cy.visit(countryUrl)
        cy.url().should('include', `https://ngcountries.netlify.app/countries/by/${countryCode}`)
        cy.get('[data-test="downloads-section"]').should('exist');
        cy.get('[data-test="downloads-section"] button.btn-download').each(($button) => {
          cy.wrap($button).click({ force: true }).then(() => {

            cy.wait(1000);
            const buttonText = $button.text().trim();
            const fileName = buttonText.substring(0, buttonText.indexOf(':'));

            cy.task('isDownloaded', fileName).then((downloaded) => {
              if (!downloaded) {
                failedDownloads.push(countryCode);
              }
            });
          });
        });

        cy.get('[data-test="loading-template"]').should('exist');
        cy.get('[data-test="country-section"]').should('exist');
        cy.get('[data-test="country-title"]').should('exist');
        cy.get('[data-test="general-details-container"]').should('exist');
        cy.get('[data-test="geographical-details-container"]').should('exist');
        cy.get('[data-test="location-section"]').should('exist');
        cy.get('[data-test="neighboring-countries-list"]').should('exist');

        cy.get('*').each(($el) => {
          const text = $el.text().trim();
          if (!text) {
            if (!missingElements.find(country => country.countryCode === countryCode)) {
              missingElements.push({ countryCode, missingElements: [$el[0].tagName] });
            } else {
              missingElements.find(country => country.countryCode === countryCode)?.missingElements.push($el[0].tagName);
            }
          }
        });
      });
      if (missingElements.length === 0) {
        cy.log('Todas las URLs tienen todos los elementos con valor');
      } else {
        missingElements.forEach(country => {
          cy.log(`A la página ${country.countryCode} le falta valor en los siguientes elementos: ${country.missingElements.join(', ')}`);
        });
      }

      if (failedDownloads.length === 0) {
        cy.log('Todos los botones de descarga descargaron contenido correctamente');
      } else {
        cy.log(`Los siguientes países tienen botones de descarga que no pudieron descargar contenido: ${failedDownloads.join(', ')}`);
      }
    });
  });
});
