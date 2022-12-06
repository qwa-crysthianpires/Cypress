/// <reference types="cypress" />

describe('Personalizar', () => {
    before(() => {
        // cy.visit('http://192.168.1.131:9090/#/oferta/3000129137/1/2/1')
        cy.visit('http://192.168.1.131:9090/#/oferta/3000130216/1/0/1')
        cy.wait(10000)

    })
    
    // it.skip('Login', () => {
    //     // cy.get('[name=USER').type('P0650051')
    //     //     .should('have.value', 'P0650051')

    //     // cy.get('[type=password')
    //     //     .type('mhQW@_00')
    //     //     .should('have.value', 'mhQW@_00')

    //     // cy.get('[type=button').click()
    // });


    it('Vidros', () => {
        let naoquero = cy.get('#cobertura-vidro')
        naoquero.uncheck();
        // @ Padronizou
        // const vidroNaoQueroContratar = cy.get('.checkbox-contratacao')

        vidroNaoQueroContratar.find('fp-checkbox')
            .shadow()
            .find('div')
            .find('input').as('Input que tenha ID')
            .invoke('attr', 'id')
            .as('idValue')
            .get('@idValue').then((idValue) => {
                naoquero = idValue
                cy.wait(1000)
                naoquero.uncheck();
            })



    });

    it.skip('Test Acessorios', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;
        let idFull = '';
        let nomeId = '';
        let numId = 0;
        let checkboxFinal = '';
        let numId2 = 0;


        cy.log('Acessórios - Index 1 - ')
        const btnAdicionarAcessorio = cy.get('#icon-btnIconeAddAcessorio');

        //@ Iniciando um Acessorio
        btnAdicionarAcessorio
            .should('to.be.visible')
            .click()
            .wait(2000)


        const btnAcessorios = cy.get('.card_fields_tipoCobertura')


        btnAcessorios
            .find('div.radiobutton')
            .find('fp-radiobutton')
            .find('div')
            .find('input').as('Input que tenha ID')
            .first()
            .invoke('attr', 'id')
            .as('idValue')


        cy.get('@idValue').then((idValue) => {
            idFull = idValue
            idFull = idFull.split('-');
            nomeId = idFull[0];
            numId = (idFull[1]);
            checkboxFinal = '#' + nomeId + '-' + numId;
            cy.wait(2000)
            cy.get(checkboxFinal)
                .click()


            cy.log('Acessórios - > Ar Condicionado R$1,00')

            // @ Minimo
            cy.get('#btn-lbl-campoTipoAcessorio0').click({ force: true })
            cy.get('#btn-item-campoTipoAcessorio0-1').click({ force: true })

            cy.get('#campoLimite0')
                .click()
                .clear()
                .type('1,00')
                .wait(3000);


            // @ COmparando premioTotal
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal;
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })

            cy.log('Acessórios - > Ar Condicionado R$10.347,30')
            // @MAXIMO
            cy.get('#campoLimite0')
                .click()
                .clear()
                .type('10.347,30')
                .wait(3000)

            // @ COmparando premioTotal
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal;
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })



            //@Segundo
            btnAdicionarAcessorio
                .should('to.be.visible')
                .click()
                .wait(2000)

            numId2 = parseInt(numId) + 3;
            checkboxFinal = '#' + nomeId + '-' + numId2;

            cy.log('Referência')

            cy.log('Acessórios - > Ar Condicionado R$1,00')

            cy.wait(2000)
            cy.get(checkboxFinal)
                .click()

            // @ Minimo
            cy.get('#btn-lbl-campoTipoAcessorio1').click({ force: true })
            cy.get('#btn-item-campoTipoAcessorio1-1').click({ force: true })

            cy.get('#campoLimite1')
                .click()
                .clear()
                .type('1,00')
                .wait(3000);


            // @ COmparando premioTotal
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal;
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })

            cy.log('Acessórios - > Ar Condicionado R$10.347,30')
            // @MAXIMO
            cy.get('#campoLimite1')
                .click()
                .clear()
                .type('10.347,30')
                .wait(3000)

            // @ COmparando premioTotal
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal;
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })

        })
    })

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
