/// <reference types="cypress" />

const { format } = require("path");


describe('Personalizar', () => {
    before(() => {
        cy.visit('http://192.168.1.131:9090/#/oferta/3000129137/1/2/1')
        cy.wait(10000)
    })


    it('Test Acessorios', () => {

        cy.log('Acessórios - Index 1 - ')
        const btnAdicionarAcessorio = cy.get('#icon-btnIconeAddAcessorio');

        //@ Iniciando um Acessorio
        btnAdicionarAcessorio
            .should('to.be.visible')
            .click()
            .wait(2000)


        const btnAcessorios = cy.get('.card_fields_tipoCobertura')
        let idFull = '';
        let nomeId = '';
        let numId = 0;
        let checkboxFinal = 0;

        btnAcessorios
            .find('div.radiobutton')
            .find('fp-radiobutton')
            .find('div')
            .find('input').as('BuscandoID')
            .first()
            .invoke('attr', 'id')
            .as('idValue')

        cy.get('@idValue').then((idValue) => {
            idFull = idValue
        })
        cy.wait(5000).as('esperar acabar')

        console.log('idFUllfora = ' + idFull)
        //SAVE
        // idFull1 = idFull.split('-');
        // nomeId = idFull1[0];
        // numId = (idFull1[1]);
        // checkboxFinal = '#'+ nomeId +'-'+ numId;

        console.log('NUMEROID'+numId)
        console.log('NOMEID'+nomeId)
        console.log('CHECBOXFINAL'+checkboxFinal)

        // @ Primeiro Botão de Refrencia
        cy.get(checkboxFinal)
            .click()


        // @ Minimo
        cy.get('#btn-lbl-campoTipoAcessorio0').click()
        cy.get('#btn-item-campoTipoAcessorio0-1').click()

        cy.get('#campoLimite0')
            .click()
            .clear()
            .type('1,00')
            .wait(1000);

        // btnAcessorios.find('div.radiobutton')
        //     .find('fp-radiobutton')
        //     .find('div')
        //     .find('input')
        //     .first()
        //     .invoke('attr', 'id')
        //     .as('idValue')

        // cy.get('@idValue').then((idValue) => {
        //     console.log(idValue) //prints id
        // })

    });

    // it.skip('Login Usuário', () => {

    //     let user = cy.get('[name=user')
    //     user.invoke('attr', 'placeholder')
    //         .as('idValue')

    //     cy.get('@idValue').then((idValue) => {
    //         concolse.log(idValue) //prints id
    //     })
    //     //     .then(($el) => {
    //     //         console.log("@2" + $el.get(0))
    //     //         console.log("@1" + $el.get(0))
    //     //     })

    //     // cy.get('[name=user').then(($premio) => {
    //     //     console.log("@3" + $premio.find)
    //     // })cy.contains('button[id*="dropdown-"]', 'Click here')





    //     // console.log(user.invoke('attr', 'placeholder'))
    //     // cy.get('[type=password')
    //     //     .type('jTKrqjaM')
    //     //     .should('have.value', 'jTKrqjaM')

    //     // cy.get('[name=buttonSubmit').click();
    //     // cy.wait(1000);


    // cy.get('button').then(($el) => {
    //     $el.get(0)
    // })
    // });


    // it.skip('INVOKE SEXO ', () => {
    //     cy.visit('http://192.168.1.131:9090/')

    //     // 592.464.911 - 30

    //     // @    CPF segurado
    //     cy.get("#ipt-cpfCnpj-segurado").click()
    //         .type(cpfSegurado).should("have.value", cpfSegurado).wait(1000);


    //     cy.get("#btn-lbl-select-sexo-novo-segurado").click()
    //         .should("have.text", " Selecione ");
    //     cy.get("div#box-select-sexo-novo-segurado.dropdown-menu").invoke("show");
    //     cy.get("#btn-item-text-select-sexo-novo-segurado-1").click();
    // });

    // it('invoke test', () => {
    //     const cpfSegurado = '592.464.911-30'
    //     cy.visit('http://192.168.1.131:9090/#/oferta/3000128001/1/2/1')
    //     cy.wait(10000)


    //     cy.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    //     const btnAdicionarAcessorio = cy.get('#icon-btnIconeAddAcessorio');
    //     let PremioTotal = 0;
    //     let novoPremioTotal = 0;

    //     btnAdicionarAcessorio
    //         .should('to.be.visible')
    //         .click()
    //         .wait(2000)

    //     const btnAcessorios = cy.get('.card_fields_tipoCobertura')
    //     btnAcessorios
    //         .find('div.radiobutton')
    //         .find('fp-radiobutton')
    //         .find('div')
    //         .find('input').first().check()

    //     cy.get('#btn-lbl-campoTipoAcessorio0').click({ force: true })
    //     cy.get('#btn-item-campoTipoAcessorio0-1').click({ force: true })

    //     cy.get('#campoLimite0')
    //         .click()
    //         .type('1,00')
    //         .wait(1000)


    //     cy.get('#txtPremioOferta').then(($premio) => {
    //         PremioTotal = novoPremioTotal;
    //         novoPremioTotal = $premio.text().trim();
    //         expect(novoPremioTotal).not.to.eq(PremioTotal);
    //     })


    //     cy.get('#campoLimite0')
    //         .clear()
    //         .type('10.347,30')
    //         .wait(1000)

    //     cy.get('#txtPremioOferta').then(($premio) => {
    //         PremioTotal = novoPremioTotal;
    //         novoPremioTotal = $premio.text().trim();
    //         expect(novoPremioTotal).not.to.eq(PremioTotal);
    //     })
    // })

})
