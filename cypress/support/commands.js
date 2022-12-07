// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/// <reference types="Cypress" />
import loc from './variaveis'

Cypress.Commands.add('login_porto_hml', (
    username = Cypress.env('USER_EMAIL'),
    password = Cypress.env('USER_PASSWORD')
) => {
    cy.session([username, password], () => {
        cy.visit('/login')
        cy.get('[name=USER').type(username)
        cy.get('[type=password').type(password, { log: false })
        cy.contains('button', 'Logon').click({ force: true })
    })
})

Cypress.Commands.add('modal_BoasVindas', () => {
    cy.get('.coachmark-modal__content')
        .should('be.visible').should('contain', 'Um novo sistema de cálculo para você')
        .then(($dialog) => {
            cy.wrap($dialog)
                .find('#icon-btnCoachmarkClose')
                .click({ force: true })
        });
})

Cypress.Commands.add('modal_CotacoesConcorrentes', () => {
    cy.get('.modal-content')
        // .should('be.visible')
        .should('contain', 'Cotações concorrentes')
        .then(($dialog) => {
            cy.wrap($dialog).find('#btn-concorrentes-cotacao-ok').contains("Ok").click({ force: true })
        });
})

Cypress.Commands.add('modal_CotacoesPendente', () => {
    cy.get('.modal-content')
        .should('be.visible').should('contain', 'Cotações Pendente')
        .then(($dialog) => {
            cy.wrap($dialog).find('#btn-ok-modal-pendente').contains("Ok").click({ force: true })
        });
})

Cypress.Commands.add('modal_TrackerObrigatorio1', () => {
    cy.get('.modal-content')
        .should('be.visible').should('contain', 'Tracker Obrigatório')
        .then(($dialog) => {
            cy.wrap($dialog).find('#btn-enviar-confirmacao').contains("Estou Ciente").click({ force: true })
        });
})

Cypress.Commands.add('modal_casco_regraVistoriaPreviaAlterada', () => {
    cy.get('.modal-content')
        .should('be.visible').should('contain', 'Regra de vistoria prévia alterada')
        .then(($dialog) => {
            cy.wrap($dialog).find('#btn-vistoria-previa-agendamento-ok').contains("Ok").click({ force: true })
        });
})
Cypress.Commands.add('modal_VerificacaoTransitoMaisGentil', () => {
    cy.get('.modal-content')
        .should('be.visible').should('contain', 'Verificação Trânsito+Gentil')
        .then(($dialog) => {
            cy.wrap($dialog).find('#btn-fechar-modal-informativo').contains("Ok").click({ force: true })
        });
})

Cypress.Commands.add('btn_recalcular', () => {
    cy.get('#recalcular')
        .first()
        // .should('be.visible')
        .click({ force: true });
})

Cypress.Commands.add('btn_salvar', () => {
    cy.get('#btn-salvar')
        // .should('be.visible')
        .click({ force: true });
})

Cypress.Commands.add('calculo_premio', (PremioTotal, novoPremioTotal) => {
    cy.get(loc.BTN.PREMIO)
        .then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })
})


Cypress.Commands.add('Seguro Corretor', (seguroCorretor) => {

    if (seguroCorretor) {
        cy.get(loc.CORRETOR.SEGURO_CORRETOR_SIM)
            .check({ force: true });
    } else {
        cy.get(loc.CORRETOR.SEGURO_CORRETOR_NAO)
            .check({ force: true });
    }

})

Cypress.Commands.add('Corretor_Segurado', (corretorSegurado) => {
    if (corretorSegurado) {
        // @ sim
        cy.get(loc.CORRETOR.CORRETOR_SEGURADO_SIM)
            .check({ force: true });
    } else {
        // @ Não
        cy.get(loc.CORRETOR.CORRETOR_SEGURADO_NAO)
            .check({ force: true });
    }
})

// Cypress.Commands.add('url_return', () => {
//     cy.on('url:changed', (url) => {
//         return url;
//     });
// })

Cypress.Commands.add('url_json', (newUrl) => {
    Cypress.Commands.add('url_json', (newUrl) => {
        cy.writeFile('cypress/fixtures/example.json', {
            url: newUrl
        })
    })
})
Cypress.Commands.add('url_env', () => {
    cy.url().then(url => {
        let getUrl = url;
        const saveLocation = 'cypress.env.json'
        cy.writeFile(saveLocation, {
            url: getUrl,
        })
    })
})

Cypress.Commands.add('recalcular_final', () => {
    cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5');
    cy.btn_recalcular();
    cy.wait('@RecalculandoValorBase5').then((xhr) => {
        console.log(xhr)
        expect(xhr.response.statusCode).be.eq(200);
    });
})



Cypress.Commands.add('modal_perdaDesconto', () => {
    cy.get('.modal-content')
        .should('be.visible').should('contain', 'Perda do desconto do Cartão Porto')
        .then(($dialog) => {
            cy.wrap($dialog)
                .find('#buttonSairSalvar')
                .click()
        });
})

Cypress.Commands.add('modal_termoResposabilidade', () => {
    cy.get('.modal-content')
        .should('be.visible').should('contain', 'Termo de responsabilidade')
        .then(($dialog) => {
            cy.wrap($dialog)
                .find('#buttonAceitarTermoAceiteProposta')
                .click()
        });
})