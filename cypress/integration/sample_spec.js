const CYPRESS_E2E_TARGET = Cypress.env('E2E_TARGET')

describe('My First Test', function () {
    it('Visits the Kitchen Sink', function () {
        const access_code = Cypress.env('access_code') || 'EhS67jSq4';
        const first_name = Cypress.env('first_name') || ' ';
        const last_name = Cypress.env('last_name') || ' ';
        const email = Cypress.env('email') || 'g.burdell@gmail.com';
        const company = Cypress.env('company') || 'Slalom';

        cy.visit(CYPRESS_E2E_TARGET)

        let registerLink = cy.get('#ui_login_self_reg_button');
        registerLink.click();

        cy.url().should('include', 'SelfRegistration.action?from=LOGIN');

        cy.get('#guestUser\\.accessCode')
            .click()
            .type(access_code);
        cy.get('#guestUser\\.fieldValues\\.ui_first_name')
            .click()
            .type(first_name);
        cy.get('#guestUser\\.fieldValues\\.ui_last_name')
            .click()
            .type(last_name);
        cy.get('#guestUser\\.fieldValues\\.ui_email_address')
            .click()
            .type(email);
        cy.get('#guestUser\\.fieldValues\\.ui_company')
            .click()
            .type(company);

        cy.get('#ui_self_reg_submit_button').click()
        cy.url().should('include', 'CreateAccount.action?from=SELF_REGISTRATION')

        cy.get('.ui_self_reg_results_username_label > div.ui-block-b').then((userDiv) => {
        cy.get('.ui_self_reg_results_password_label > div.ui-block-b').then((passDiv) => {
            let user = userDiv.text()
            let pass = passDiv.text()

            cy.get('#ui_self_reg_results_submit_button').click();
            cy.url().should('include', 'SelfRegistrationSuccess.action');

            cy.get('#user\\.username').click().type(user);
            cy.get('#user\\.password').click().type(pass);
            cy.get('#ui_login_signon_button').click();
            cy.get('#ui_aup_accept_button').click();
        });
        });
    });
})
