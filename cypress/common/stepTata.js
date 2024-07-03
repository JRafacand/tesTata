import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import '@testing-library/cypress/add-commands'


Given('I am on the Demoblaze home page', () => {
    cy.visit('https://www.demoblaze.com//');
    cy.get('title').invoke('text').should('eq', 'STORE');
    cy.get('#login2').should('be.visible').click();
})

When('I login with the following credentials', (dataUser) => {
    const data = dataUser.hashes()[0];
    if (data.username == 'standard_user') {
        cy.get('#loginusername').type(data.username, {force: true});
    } else if (data.username != 'standard_user') {
        assert.fail('Invalid username, review your data table');
    };
    if (data.password == 'secret_sauce') {
        cy.get('#loginpassword').type(data.password, {force: true});
    }
    else if (data.password != 'secret_sauce') {
        assert.fail('Invalid password, review your data table');
    }
    cy.get('[data-test="error"]').should('not.exist').then(() => {
        cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').should('be.visible').click({force: true});
        cy.log('Login successful');
    });
});

Then('Choose below different products', (dataProduct) => {
    const productSelect = { 
      'Samsung galaxy s6':':nth-child(1) > .card > .card-block > .card-title > .hrefch',
      'Nokia lumia 1520': ':nth-child(2) > .card > .card-block > .card-title > .hrefch',
      'Nexus 6' : ':nth-child(3) > .card > .card-block > .card-title > .hrefch',
      'Samsung galaxy s7': ':nth-child(4) > .card > .card-block > .card-title > .hrefch',
      'Iphone 6 32gb': ':nth-child(5) > .card > .card-block > .card-title > .hrefch',
      'Sony xperia z5': ':nth-child(6) > .card > .card-block > .card-title > .hrefch'  
    }
    
    dataProduct.hashes().forEach((row) => {
        const selector = productSelect[row.product_name]
        if (selector) {
            cy.wait(1000)   
            cy.get(selector).as('productLink').should('be.visible', {force: true}).click({force: true});
            cy.wait(1000)
            cy.get('.col-sm-12 > .btn').should('be.visible').click({force: true});
            cy.get('.active > .nav-link').should('be.visible').click({force: true});
        } else (assert.fail('Producto no encontrado'))

    })

});

Then('I click on the shopping cart and click on the checkout button', () => {
    cy.get('#cartur').should('be.visible').click({force: true});
    cy.get('.col-lg-1 > .btn').should('be.visible').click({force: true});
});

Then('I fill out the form with the following information', (dataTable3) => {
    const data = dataTable3.hashes()[0];
    cy.get('#name').should('be.visible').type(data.name_lastn, {force: true});
    cy.get('#country').should('be.visible').type(data.country, {force: true});
    cy.get('#city').should('be.visible').type(data.city, {force: true});
    cy.get('#card').should('be.visible').type(data.credit_Card, {force: true});
    cy.get('#month').should('be.visible').type(data.month, {force: true});
    cy.get('#year').scrollIntoView().should('be.visible').type(data.year, {force: true});
});

Then('I click on the continue button and I should see Thank you for your order', () => {
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').should('be.visible').click({force: true});
    cy.get('.sweet-alert > h2').invoke('text').should('eq', 'Thank you for your purchase!');
    cy.wait(1000)
    cy.get('.confirm').should('be.visible').click({force: true});
});

  