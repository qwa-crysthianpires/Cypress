/// <reference types="cypress" />

// import loc from '/../support/locators'

/* PRIMEIRA PAGINA DIRETO*/
//cy.visit('http://192.168.1.131:9090/')// @ Stella

/* SEGUNDA PAGINA DIRETO*/
// cy.visit('http://192.168.1.131:9090/#/resultado/2000040369/0');        // @ Stella

/* TERCEIRA PAGINA DIRETO*/
// cy.visit('http://192.168.1.131:9090/#/oferta/2000040349/1/0/1');    // @ Stella
//  cy.visit('http://192.168.1.131:9090/#/oferta/2000039674/1/2/1');   // @ Crysthian
// cy.visit('http://192.168.1.131:9090/#/oferta/2000039686/1/0/1');    // @ Felipe


describe("Novo Segurado", () => {

    // it.skip('Login', () => {
    //     // cy.get('[name=USER').type('P0650051')
    //     //     .should('have.value', 'P0650051')

    //     // cy.get('[type=password')
    //     //     .type('mhQW@_00')
    //     //     .should('have.value', 'mhQW@_00')

    //     // cy.get('[type=button').click()
    // });

    it("Dados do Segurado", () => {

        // @ Stella


        // @PAGINA 1
        cy.visit('http://192.168.1.131:9090/#/cotacao').wait(10000);

        // @PAGINA 2
        // cy.visit('http://192.168.1.131:9090/#/oferta/2000040349/1/30/1').wait(10000);

        // @PAGINA3
        // 

        //@ VAR
        let PremioTotal = 0;
        let novoPremioTotal = 0;
        const cpfSegurado = '227.827.558-54' //felipe: 470.539.618-93 
        const nomeSegurado = 'Stella Cristiane Laís Nascimento'
        const nascSegurado = '24/03/1995'

        //// @ Função de Fechar o MODAL
        cy.get('.coachmark-modal__content')
            .should('be.visible').should('contain', 'Um novo sistema de cálculo para você')
            .then(($dialog) => {
                cy.wrap($dialog).find('#icon-btnCoachmarkClose').click()
            });

        //--------------------------------------------------------------------------------------//
        //-------------------------@---SEGURADO-NOVO--------------------------------------------//
        //--------------------------------------------------------------------------------------//

        // cy.get('#checkbox-0').click();

        //  @CLASSE BONUS
        // cy.get('#btn-lbl-select-bonus')
        //     .invoke('show')
        //     .select('title=0')
        //     .click();

        // @    CPF segurado
        cy.get("#ipt-cpfCnpj-segurado").click()
            .type(cpfSegurado).should("have.value", cpfSegurado);

        // // @    Nome do Segurado
        // cy.get("#inp-nome-novo-segurado")
        //     .type(nomeSegurado)
        //     .should("have.value", nomeSegurado);

        // // @    Data de Nascimento
        // cy.get("#ipt-picker-inp-dataNascimento-novo-segurado").click()
        //     .type(nascSegurado)
        //     .should("have.value",nascSegurado);

        // // @    Sexo
        // cy.get("#btn-lbl-select-sexo-novo-segurado").click({ force: true });
        // cy.get("#btn-item-text-select-sexo-novo-segurado-1").click({ force: true });







        //--------------------------------------------------------------------------------------//
        //-------------------------@---CARRO-NOVO-----------------------------------------------//
        //--------------------------------------------------------------------------------------//

        //@ Placa
        cy.get('#ipt-inp--placa', { timeout: 10000 })
            .type('GDN-2736').should("have.value", "GDN-2736");

        // @ Ano de Fabricação
        cy.get("#btn-lbl-select-ano-fabricacao").click({ force: true });
        cy.get("#btn-item-select-ano-fabricacao-3").click({ force: true }); // 2019 -3

        // @ Ano do Modelo
        cy.wait(1000).get("#btn-lbl-select-ano-modelo2").click();
        cy.get("#btn-item-select-ano-modelo2-1").click(); //2019
        // cy.get('btn-item-select-ano-modelo2-0').click() //2020

        // @ Modelo do Veículo
        cy.get("#ipt-inp-modeloVeiculo").click().type("Civic");
        cy.get("#autocomplete-item-5129").click(); //civc
        //cy.get("#autocomplete-item-245").click(); // corola
        // cy.get('#autocomplete-item-14027').click();

        // @ Uso do Veículo
        cy.get("#btn-lbl-btn-slct-tipo-uso").click({ force: true });
        cy.get("#btn-item-btn-slct-tipo-uso-0").click({ force: true });

        // @    CEP
        cy.get("#ipt-ipt-cep-component-endereco").click()
            .type("16901852").should("have.value", "16901-852")
            .wait(1000);

        cy.get("#tag-ipt-cep-component-endereco-0")
            .click();

        // @    Submit 
        cy.get("#bt-buscar-ofertas-novo")
            .click();

        // @ LOADING SEGUNDA PAGE
        cy.wait(20000);

        // cy.get('#id_concorrentes_cotacao_title')
        // cy.get('#btn-concorrentes-cotacao-ok')

        // cy.get('#modal-title-rastreamento')
        // cy.get('#btn-enviar-confirmacao')

        // cy.get('#btn-enviar-confirmacao')
        // cy.get('#bt-personalizar-oferta-1')

        // //  @ label do valor
        // cy.get('#label-premio-riscado-1')




        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        // @2ªPAGINA

        cy.wait(5000);
        cy.get('.modal-content')
            .should('be.visible').should('contain', 'Cotações concorrentes')
            .then(($dialog) => {
                cy.wrap($dialog).find('#btn-concorrentes-cotacao-ok').contains("Ok").click()
            });

        // cy.get('.modal-content')
        //     .should('be.visible').should('contain', 'Tracker Obrigatório')
        //     .then(($dialog) => {
        //         cy.wrap($dialog).find('#btn-enviar-confirmacao').contains("Estou Ciente").click()
        //     });

        cy.wait(5000)
        let btnRE = cy.get('#tgl-cross-selling-on-3')
        cy.get('#tgl-cross-selling-on-3').then(($btn) => {
            cy.wrap($btn)
                .shadow()
                .find('div')
                .find('input')
                .should('exist').uncheck();
        })

        cy.log('Desativando o Checkbox do RE')
        cy.wait(1000);

        cy.get('#tgl-cross-selling-on-3').then(($btn) => {
            cy.wrap($btn)
                .shadow()
                .find('div')
                .find('input')
                .should('exist').uncheck();
        })
        cy.get('#label-premio-riscado-1').then(($btn) => {
            PremioTotal = $btn.text().trim();
        })

        cy.log('Ativando o Checkbox do RE')
        cy.wait(1000);
        btnRE.click({ force: true });
        cy.wait(10000);

        cy.get('#label-premio-riscado-1').then(($btn) => {
            novoPremioTotal = $btn.text().trim();
            expect(novoPremioTotal).not.to.be.equal(PremioTotal);
        })

        cy.get('#bt-personalizar-oferta-1').click()
            .wait(30000)



        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        // @3ªPAGINA

        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        // @VALOR BASE

        cy.wait(10000)
        let btnSalvar = cy.get('#btn-salvar')
        cy.get('#txtPremioOferta').then(($btn) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $btn.text().trim();
        })

        cy.log('Valor Base com 5%')

        cy.get('#input-valor-base-variacao-opcionais')
            .clear()
            .type(5.00)
            .should('have.value', '5,00%')
            .wait(5000)

        let btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click()
                .wait(15000)
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })
        }
        btnSalvar.click();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        cy.log('Valor Base com -20%')

        cy.get('#input-valor-base-variacao-opcionais')
            .clear()
            .type(-20.00)
            .should('have.value', '-20,00%', '-20%') // Premio =  R$ 165.556,80
            .wait(5000);

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('be.visible')) {
            btnRecalcular.click()
                .wait(15000);
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })
        }
        btnSalvar.click();


        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        // @COBERTURAS

        btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);
        // const btnCasco = cy.get('#tgl-cross-selling-on-3');
        // cy.get('.coberturas__casco__checkbox')
        //     .should('not.be.checked')

        // @    Casco
        cy.log('Desativado o checkbox do @CASCO')
        btnCasco.shadow()
            .find('div')
            .find('input').should('exist').uncheck()
            .wait(5000);

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('be.visible')) {
            btnRecalcular.click()
                .wait(15000);
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal;
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })
        }

        // @ Função Fechar Modal
        cy.get('.modal-content')
            .should('be.visible').should('contain', 'Regra de vistoria prévia alterada')
            .then(($dialog) => {
                cy.wrap($dialog).find('#btn-vistoria-previa-agendamento-ok').contains("Ok").click()
            });




        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> Obrigatória');

        cy.log('Ativando o checkbox do @CASCO')
        cy.get('#checkbox-cobertura-casco')
            .shadow()
            .find('div')
            .find('input').should('exist').check()
            .wait(5000);
        // Recalculo Obrigatorio quando ativa o Checkbox do @CASCO
        // @    Cobertura
        cy.get('#btn-lbl-btn-slct-casco').click({ force: true })                                    //      $Cobertura$
        cy.get('#btn-item-btn-slct-casco-0').click({ force: true })                                 // @    Compreensiva
        // @     Modalidade
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })                        //      $Modalidade$
        cy.get('#btn-item-btn-slct-modalidade-seguro-0').click({ force: true })                     // @    Valor de Mercado
        // @     Franquia
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })                          //      $Franquia$
        cy.get('#btn-item-btn-slct-franquia-seguro-0').click({ force: true }).as('index 0')         //  Obrigatoria

        // @    Recalulado Obrigatório
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('be.visible')) {
            btnRecalcular.click()
                .wait(15000);
        }

        // @ Função Fechar Modal
        cy.get('.modal-content')
            .should('be.visible').should('contain', 'Regra de vistoria prévia alterada')
            .then(($dialog) => {
                cy.wrap($dialog).find('#btn-vistoria-previa-agendamento-ok').contains("Ok").click()
            });

        // @ COmparando txt
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })





        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor de Mercado / Franquia -> 200%')

        // @ Franquia - 200% da Obrigatoria
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-1').click({ force: true })
        cy.wait(1000);
        // @ Função Recalcular 
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })






        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor de Mercado / Franquia -> 125%')

        // @ Franquia - 125%
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-2').click({ force: true }).as('index 2')
        cy.wait(1000);

        // @ Função Recalcular 
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })





        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor de Mercado / Franquia -> 150%')

        // @ Franquia - 150%
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-3').click({ force: true }).as('index 3')
        cy.wait(1000);

        // @ Função Comparar Novo != Antigo
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })





        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//


        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor de Mercado / Franquia -> 175%')

        // @ Franquia - 175%
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-4').click({ force: true }).as('index 3')

        // @ Função Comparar Novo != Antigo
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })





        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> Obrigatória')

        // @     Modalidade -> Valor de Mercado
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-1').click({ force: true })
        // @     Franquia - > Obrigatória
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-0').click({ force: true }).as('index 0')

        // @ Função Recalcular 
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })



        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 200%')

        // @ Franquia - 200%
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-1').click({ force: true })
        cy.wait(1000);

        // @ Função Recalcular 
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })






        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 125%')

        // @ Franquia - 125%
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-2').click({ force: true }).as('index 2') // 
        cy.wait(1000);

        // @ Função Recalcular 
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })






        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 150%')

        // @ Franquia - 150%
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-3').click({ force: true }).as('index 3')// 
        cy.wait(1000);

        // @ Função Recalcular
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })



        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//


        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 175%')

        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-4').click({ force: true }).as('index 3')// // @ Franquia - 175% da Obrigatoria
        cy.wait(1000)
        // @ Função Comparar Novo != Antigo
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })





        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Cobertura -> Incêndio e Rouo / Modalidade -> Valor de Mercado / Franquia -> Obrigatória')
        // @    Cobertura
        cy.get('#btn-lbl-btn-slct-casco').click({ force: true })        //      $Cobertura$
        cy.get('#btn-item-btn-slct-casco-1').click({ force: true })     // @    Compreensiva
        //  @     Modalidade
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })        //      $Modalidade$
        cy.get('#btn-item-btn-slct-modalidade-seguro-0').click({ force: true })     // @    Valor de Mercado
        cy.wait(1000);

        // @ Função Comparar Novo != Antigo
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }
        // @ Função Comparar Novo != Antigo
        PremioTotal = novoPremioTotal;
        cy.get('#txtPremioOferta').then(($premio) => {
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })


        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//


        cy.log('Cobertura -> Incêndio e Roubo / Modalidade -> Valor Determinado / Franquia -> Obrigatória')
        //  @     Modalidade
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })        //      $Modalidade$
        cy.get('#btn-item-btn-slct-modalidade-seguro-1').click({ force: true })     // @    Valor Determinado
        cy.wait(1000)
        // @ Função Comparar Novo != Antigo
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }
        PremioTotal = novoPremioTotal;
        cy.get('#txtPremioOferta').then(($premio) => {
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })





        //--------------------------------------------------------------------------------------//
        //-------------------------@RCFV--DANOS-MATERIAIS---------------------------------------//
        //--------------------------------------------------------------------------------------//

        // @0
        cy.log('@RFCV-DANOS-MATERIAIS INDEX 0 ')

        // pegar o checkbox ~
        // uncheck
        // comparar
        // check 
        // comparar
        // 
        cy.get('#labelRCFA-DanosMateriais > .slider__label__icon > .ng-star-inserted')

        cy.get('[ng-reflect-index="0"]')
            .find('.cobertura-range').should('to.be.visible')
            .find('.range').should('to.be.visible')
            .find('.slider-item').should('to.be.visible')
            .find('.slider').should('to.be.visible')
            .find('.slider__box').should('to.be.visible')
            .find('.input').should('to.be.visible')
            .find('.input__dropdown').should('to.be.visible')
            .find('.enabled-dropdown').should('to.be.visible')
            .find('.inp-dropdown').should('to.be.visible')
            .find('#btn-lbl-').should('to.be.visible').click({ force: true })
            .wait(2000)
        let primeira = cy.get('[ng-reflect-index="0"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--1')
        primeira.click({ force: true }).wait(2000);

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        //////////////////////////////////////////////////////////////////
        // @38

        cy.log('@RFCV-DANOS-MATERIAIS INDEX 38 ')
        cy.get('[ng-reflect-index="0"]')
            .find('.cobertura-range').should('to.be.visible')
            .find('.range').should('to.be.visible')
            .find('.slider-item').should('to.be.visible')
            .find('.slider').should('to.be.visible')
            .find('.slider__box').should('to.be.visible')
            .find('.input').should('to.be.visible')
            .find('.input__dropdown').should('to.be.visible')
            .find('.enabled-dropdown').should('to.be.visible')
            .find('.inp-dropdown').should('to.be.visible')
            .find('#btn-lbl-').should('to.be.visible').click({ force: true })
            .wait(2000)
        let ultima = cy.get('[ng-reflect-index="0"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--38')
        ultima.click({ force: true }).wait(2000);

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })


        //--------------------------------------------------------------------------------------//
        //-------------------------@RCFV--DANOS-CORPORAIS---------------------------------------//
        //--------------------------------------------------------------------------------------//
        //@0
        cy.get('#labelRCFA-DanosMateriais > .slider__label__icon > .ng-star-inserted')


        cy.get('[ng-reflect-index="1"]')
            .find('.cobertura-range').should('to.be.visible')
            .find('.range').should('to.be.visible')
            .find('.slider-item').should('to.be.visible')
            .find('.slider').should('to.be.visible')
            .find('.slider__box').should('to.be.visible')
            // cy.get('[ng-reflect-id-label="dropdown-RCFV-DanosCorporais"]').should('to.be.visible')
            .find('.input').should('to.be.visible')
            .find('.input__dropdown').should('to.be.visible')
            .find('.enabled-dropdown').should('to.be.visible')
            .find('.inp-dropdown').should('to.be.visible')
            .find('#btn-lbl-').should('to.be.visible').click({ force: true })
            .wait(2000)
        primeira = cy.get('[ng-reflect-index="1"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--2')
        primeira.click({ force: true }).wait(2000);

        /////////////////////////////////////////////////////////////////////////////////////////
        // @38

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        ultima = cy.get('[ng-reflect-index="1"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--38')
        ultima.click({ force: true }).wait(2000);

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })
        //--------------------------------------------------------------------------------------//
        //-------------------@RCFV--ACIDENTES-PESSOAIS-PASSAGEIROS------------------------------//
        //--------------------------------------------------------------------------------------//
        // @0

        cy.get('#labelAcidentesPessoaisPassageiros > .slider__label__icon > .ng-star-inserted')

        cy.get('[ng-reflect-index="2"]')
            .find('.cobertura-range').should('to.be.visible')
            .find('.range').should('to.be.visible')
            .find('.slider-item').should('to.be.visible')
            .find('.slider').should('to.be.visible')
            .find('.slider__box').should('to.be.visible')
            .find('.input').should('to.be.visible')
            .find('.input__dropdown').should('to.be.visible')
            .find('.enabled-dropdown').should('to.be.visible')
            .find('.inp-dropdown').should('to.be.visible')
            .find('#btn-lbl-').should('to.be.visible').click({ force: true })
            .wait(2000)
        primeira = cy.get('[ng-reflect-index="2"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--0')
        primeira.click({ force: true }).wait(2000);

        /////////////////////////////////////////////////////////////////////////////////////////
        // @38

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        ultima = cy.get('[ng-reflect-index="2"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--23 > #btn-item-text--23')
        ultima.click({ force: true }).wait(2000);

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })



        //--------------------------------------------------------------------------------------//
        //-------------------@RCFV--DANOS-MORAIS-E-ESTETICOS------------------------------------//
        //--------------------------------------------------------------------------------------//
        // @0
        cy.get('#labelDanosMoraiseEstéticos > .slider__label__icon > .ng-star-inserted')

        cy.get('[ng-reflect-index="3"]')
            .find('.cobertura-range').should('to.be.visible')
            .find('.range').should('to.be.visible')
            .find('.slider-item').should('to.be.visible')
            .find('.slider').should('to.be.visible')
            .find('.slider__box').should('to.be.visible')
            .find('.input').should('to.be.visible')
            .find('.input__dropdown').should('to.be.visible')
            .find('.enabled-dropdown').should('to.be.visible')
            .find('.inp-dropdown').should('to.be.visible')
            .find('#btn-lbl-').should('to.be.visible').click({ force: true })
            .wait(2000)
        primeira = cy.get('[ng-reflect-index="1"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--3 > #btn-item-text--3')
        primeira.click({ force: true }).wait(2000);

        // @ Função Comparar Novo != Antigo
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        /////////////////////////////////////////////////////////////////////////////////////////
        // @38

        cy.get('[ng-reflect-index="3"]')
            .find('.cobertura-range').should('to.be.visible')
            .find('.range').should('to.be.visible')
            .find('.slider-item').should('to.be.visible')
            .find('.slider').should('to.be.visible')
            .find('.slider__box').should('to.be.visible')
            .find('.input').should('to.be.visible')
            .find('.input__dropdown').should('to.be.visible')
            .find('.enabled-dropdown').should('to.be.visible')
            .find('.inp-dropdown').should('to.be.visible')
            .find('#btn-lbl-').should('to.be.visible').click({ force: true })
            .wait(2000)

        ultima = cy.get('[ng-reflect-index="1"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--38 > #btn-item-text--38')
        ultima.click({ force: true }).wait(2000);

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })





        //----------------------------------------------------------------------------------------//
        //                       ACESSÓRIOS, EQUIPAMENTOS OU CARROCERIAS                          //
        //----------------------------------------------------------------------------------------//
        // cy.log('Acessórios - Index 1 - ')
        // const btnAdicionarAcessorio = cy.get('#icon-btnIconeAddAcessorio');
        // //@ Iniciando um Acessorio
        // btnAdicionarAcessorio
        //     .should('to.be.visible')
        //     .click()
        //     .wait(2000)

        // const btnAcessorios = cy.get('.card_fields_tipoCobertura')
        // const btnReferencia = cy.get('.card_fields_tipoCobertura');
        // // const btnRemoverAcessorio = cy.get('#icon-btnIconeDeleteAcessorio0');
        // // const valorAcessorio = cy.get('#campoLimite0');

       
        // btnAcessorios
        //     .find('div.radiobutton')
        //     .find('fp-radiobutton')
        //     .find('div')
        //     .find('input').as('BuscandoID')
        //     .first()
        //     .check()


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

        // cy.get('#btn-lbl-campoTipoAcessorio0').click({ force: true })
        // cy.get('#btn-item-campoTipoAcessorio0-1').click({ force: true })



        // cy.get('#campoLimite0')
        //     .click()
        //     .clear()
        //     .type('1,00')
        //     .wait(1000)

        // cy.get('#txtPremioOferta').then(($premio) => {
        //     PremioTotal = novoPremioTotal;
        //     novoPremioTotal = $premio.text().trim();
        //     expect(novoPremioTotal).not.to.eq(PremioTotal);
        // })

        // // @MAXIMO
        // cy.get('#campoLimite0')
        //     .click()
        //     .clear()
        //     .type('10.347,30')
        //     .wait(1000)

        // cy.get('#txtPremioOferta').then(($premio) => {
        //     PremioTotal = novoPremioTotal;
        //     novoPremioTotal = $premio.text().trim();
        //     expect(novoPremioTotal).not.to.eq(PremioTotal);
        // })




        //----------------------------------------------------------------------------------------//
        //                                          VIDROS                                        //
        //----------------------------------------------------------------------------------------//




        //----------------------------------------------------------------------------------------//
        //                                          VIDROS                                        //
        //----------------------------------------------------------------------------------------//

    })
})