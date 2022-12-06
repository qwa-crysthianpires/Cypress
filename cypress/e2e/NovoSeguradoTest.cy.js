/// <reference types="cypress" />

import '../support/commands'
import '../support/variaveis'

describe("Novo Segurado", () => {

    it("Dados do Segurado", () => {

        cy.visit('http://192.168.1.131:9090/#/cotacao').wait(10000);

        //@ Variaveis
        let PremioTotal = 0;
        let novoPremioTotal = 0;

        // Stella
        // const cpfSegurado = '227.827.558-54' 
        // const nomeSegurado = 'Stella Cristiane Laís Nascimento'
        // const nascSegurado = '24/03/1995'

        // const cpfSegurado = '756.538.098-96'
        const cpfSegurado = '362.799.448-59'
        const nomeSegurado = 'Levi Rodrigo da Silva'
        const nascSegurado = '07/04/1999'
        const cepSegurado = '16901-852'

        //// @ Função de Fechar o MODAL
        cy.modal_BoasVindas();

        //--------------------------------------------------------------------------------------//
        //-------------------------@---SEGURADO-NOVO--------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.get("#ipt-cpfCnpj-segurado").click().type(cpfSegurado).should("have.value", cpfSegurado).wait(1000);
        // cy.get("#inp-nome-novo-segurado").type(nomeSegurado).should("have.value", nomeSegurado);
        // cy.get("#ipt-picker-inp-dataNascimento-novo-segurado").click({ force: true }).type(nascSegurado).should("have.value", nascSegurado);
        // cy.get("#btn-lbl-select-sexo-novo-segurado").click({ force: true });
        // cy.get("#btn-item-text-select-sexo-novo-segurado-1").click({ force: true });
		
        //--------------------------------------------------------------------------------------//
        //-----------------------------CARRO-NOVO-----------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.get('.input__toggle__btn').shadow().find('div').find('input').first().check({ force: true })
        cy.get("#btn-lbl-select-ano-fabricacao").click().wait(1000);
        cy.get("#btn-item-select-ano-fabricacao-1").click({ force: true })
        cy.wait(1000).get("#btn-lbl-select-ano-modelo2").click({ force: true }).wait(1000);
        cy.get("#btn-item-select-ano-modelo2-1").click({ force: true }).wait(1000);
        cy.get("#ipt-inp-modeloVeiculo").click({ force: true }).type("Gol")
        cy.get('#autocomplete-item-5206').click({ force: true }).wait(1000);
        cy.get('#chkb-veiculoZeroQuilometro').click();
        cy.get("#btn-lbl-btn-slct-tipo-uso").click({ force: true });
        cy.get("#btn-item-btn-slct-tipo-uso-0").click({ force: true });
        cy.get("#ipt-ipt-cep-component-endereco").click({ force: true }).type(cepSegurado).should("have.value", cepSegurado).wait(1000);
        cy.get("#tag-ipt-cep-component-endereco-0").click().wait(1000);

        cy.get("#bt-buscar-ofertas-novo").click({ force: true })

        //--------------------------------------------------------------------------------------//
        //------------------------------------RESULTADO-----------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.wait(30000)
        cy.modal_CotacoesConcorrentes();

        // // @Padronizando
        cy.get('#cross-selling-1')
            .find('div')
            .find(':nth-child(2)')
            .find('div')
            .find('div')
            .find('fp-checkbox')
            .shadow()
            .find('div')
            .find('input')
            .should('exist')
            .uncheck({ force: true })
            .wait(3000)
        cy.get('#cross-selling-1')
            .find('div')
            .find(':nth-child(3)')
            .find('div')
            .find('div')
            .find('fp-checkbox')
            .shadow()
            .find('div')
            .find('input')
            .should('exist')
            .uncheck({ force: true })
            .wait(3000)
        cy.get('#label-premio-riscado-1').then(($btn) => {
            PremioTotal = $btn.text().trim();
        })


        cy.log('Ativando Cartão Porto')
        cy.intercept('PUT', 'http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamento/**/ofertacruzadacartaoporto').as('AtivandoCartaoPorto');
        cy.get('#cross-selling-1')
            .find('div')
            .find(':nth-child(2)')
            .find('div')
            .find('div')
            .find('fp-checkbox')
            .shadow()
            .find('div')
            .find('input')
            .should('exist')
            .check({ force: true })
            .wait(2000)
        cy.wait('@AtivandoCartaoPorto').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200);
        });

        cy.log('Ativando o Checkbox do RE')
        cy.intercept('POST', 'http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentosRE').as('AtivandoRE');
        cy.get('#cross-selling-1')
            .find('div')
            .find(':nth-child(3)')
            .find('div')
            .find('div')
            .find('fp-checkbox')
            .shadow()
            .find('div')
            .find('input')
            .should('exist')
            .check({ force: true })
            .wait(3000)

        cy.wait('@AtivandoRE').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200);
        });
        cy.wait(10000)//$$
        cy.get('#cross-selling-1')
            .find('div')
            .find(':nth-child(3)')
            .find('div')
            .find(':nth-child(4)')
            .find(':nth-child(2)')
            .find('p')
            .find('a').click({ force: true })

        cy.get('.plano-residencial').find('div').find('div').find('div').find('div').find(':nth-child(2)').find('fp-radiobutton').find('div').find('input').check({ force: true })
        cy.get('#btn-lbl-select-plano-residencial').click({ force: true })
        cy.get('#btn-item-select-plano-residencial-0').click({ force: true })
        cy.get('#btn-aplicar-modal-planos').click({ force: true })
        cy.wait(3000)

        cy.get('#label-premio-riscado-1').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.get('#cross-selling-1')
            .find('div')
            .find(':nth-child(3)')
            .find('div')
            .find(':nth-child(4)')
            .find(':nth-child(2)')
            .find('p')
            .find('a').click({ force: true })

        cy.get('.plano-residencial').find('div').find('div').find('div').find('div').find(':nth-child(2)').find('fp-radiobutton').find('div').find('input').check({ force: true })
        cy.get('#btn-lbl-select-plano-residencial').click({ force: true })
        cy.get('#btn-item-select-plano-residencial-2').click({ force: true })
        cy.get('#btn-aplicar-modal-planos').click({ force: true })
        cy.wait(3000)

        cy.get('#label-premio-riscado-1').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.get('#cross-selling-1')
            .find('div')
            .find(':nth-child(3)')
            .find('div')
            .find(':nth-child(4)')
            .find(':nth-child(2)')
            .find('p')
            .find('a').click({ force: true })

        cy.get('.plano-residencial').find('div').find('div').find('div').find('div').find(':nth-child(3)').find('fp-radiobutton').find('div').find('input').check({ force: true })
        cy.get('#btn-lbl-select-plano-residencial').click({ force: true })
        cy.get('#btn-item-select-plano-residencial-2').click({ force: true })
        cy.get('#btn-aplicar-modal-planos').click({ force: true })
        cy.wait(3000)

        cy.get('#label-premio-riscado-1').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.get('#bt-personalizar-oferta-1').click({ force: true }).wait(60000)

        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        // @3ªPAGINA

        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------//
        // @VALOR BASE

        cy.wait(10000)
        // @save
        let btnSalvar = cy.get('#btn-salvar')
        btnSalvar
            .click()
            .wait(1000);

        cy.wait(10000)
        btnSalvar = cy.get('#btn-salvar')
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

        cy.wait(1000);
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
        // cy.get('.modal-content')
        //     .should('exist').should('contain', 'Regra de vistoria prévia alterada')
        //     .then(($dialog) => {
        //         cy.wrap($dialog).find('#btn-vistoria-previa-agendamento-ok').contains("Ok").click()
        //     });




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
        primeira = cy.get('[ng-reflect-index="3"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--3 > #btn-item-text--3')
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

        ultima = cy.get('[ng-reflect-index="3"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--38 > #btn-item-text--5')
        ultima.click({ force: true }).wait(2000);

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })





        //----------------------------------------------------------------------------------------//
        //                       ACESSÓRIOS, EQUIPAMENTOS OU CARROCERIAS                          //
        //----------------------------------------------------------------------------------------//
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
                .wait(3000);;


            // @ COmparando premioTotal
            // cy.get('#txtPremioOferta').then(($premio) => {
            //     PremioTotal = novoPremioTotal;
            //     novoPremioTotal = $premio.text().trim();
            //     expect(novoPremioTotal).not.to.eq(PremioTotal);
            // })

            cy.log('Acessórios - > Ar Condicionado R$10.347,30')
            // @MAXIMO
            cy.get('#campoLimite0')
                .click()
                .clear()
                .type('10.347,30')
                .wait(3000);

            // @ COmparando premioTotal
            // cy.get('#txtPremioOferta').then(($premio) => {
            //     PremioTotal = novoPremioTotal;
            //     novoPremioTotal = $premio.text().trim();
            //     expect(novoPremioTotal).not.to.eq(PremioTotal);
            // })



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
            // cy.get('#txtPremioOferta').then(($premio) => {
            //     PremioTotal = novoPremioTotal;
            //     novoPremioTotal = $premio.text().trim();
            //     expect(novoPremioTotal).not.to.eq(PremioTotal);
            // })

            cy.log('Acessórios - > Ar Condicionado R$10.347,30')
            // @MAXIMO
            cy.get('#campoLimite1')
                .click()
                .clear()
                .type('10.347,30')
                .wait(3000);

            // @ COmparando premioTotal
            // cy.get('#txtPremioOferta').then(($premio) => {
            //     PremioTotal = novoPremioTotal;
            //     novoPremioTotal = $premio.text().trim();
            //     expect(novoPremioTotal).not.to.eq(PremioTotal);
            // })

        })




        // //----------------------------------------------------------------------------------------//
        // //                                          VIDROS                                        //
        // //----------------------------------------------------------------------------------------//

        // @ Ativando a opção nao quero contratar 
        const vidroNaoQueroContratar = cy.get('[name=cobertura-vidro')
            .should('exist')
            .should('to.be.visible')
            .uncheck()
            .wait(1000);

        // @ Desativando a opção nao quero contratar
        vidroNaoQueroContratar
            .should('exist')
            .should('to.be.visible')
            .check()
            .wait(1000);

        //76 - Vidros, retrovisores, lanternas e faróis
        // @ Referenciada
        cy.get('.questao corpo__item')
            .find('div')
            .find('div').last()
            .find('div').first()
            .find('div')
            .find('fp-radiobutton')
            .find('input').should('exist')
            .check();
        // cy.get('#txtPremioOferta').then(($premio) => {
        //     PremioTotal = novoPremioTotal;
        //     novoPremioTotal = $premio.text().trim();
        //     expect(novoPremioTotal).not.to.eq(PremioTotal);
        // })
        // vidroNaoQueroContratar.uncheck().wait(1000);
        // cy.get('#txtPremioOferta').then(($premio) => {
        //     PremioTotal = novoPremioTotal;
        //     novoPremioTotal = $premio.text().trim();
        //     expect(novoPremioTotal).not.to.eq(PremioTotal);
        // })
        // // @ Livre Escolha 
        // cy.get('.questao corpo__item')
        // .find('div')
        // .find('div').last()
        // .find('div').last()
        // .find('div')
        // .find('fp-radiobutton')
        // .find('input').should('exist')
        // .check();
        // cy.get('#txtPremioOferta').then(($premio) => {
        //     PremioTotal = novoPremioTotal;
        //     novoPremioTotal = $premio.text().trim();
        //     expect(novoPremioTotal).not.to.eq(PremioTotal);
        // })
        // vidroNaoQueroContratar.uncheck().wait(1000);
        // cy.get('#txtPremioOferta').then(($premio) => {
        //     PremioTotal = novoPremioTotal;
        //     novoPremioTotal = $premio.text().trim();
        //     expect(novoPremioTotal).not.to.eq(PremioTotal);
        // })

        //----------------------------------------------------------------------------------------//
        //                                         ACESSORIOS                                       //
        //----------------------------------------------------------------------------------------//

        cy.log('31 - Essencial - Assistência Km ilimitado / Serviços à residência')
        cy.get('#checkbox-0').click();
        cy.wait(1000)

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        ////////////////////////////////

        cy.log('32 - Completo - Assistência Km ilimitado / Serviços à residência')

        //@referencia
        cy.get('#checkbox-1').click();
        cy.wait(1000)

        ////////////////////////////////

        cy.get('#checkbox-2').click();
        cy.wait(1000)

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        //@Livre escolha
        cy.get('#checkbox-3').click();
        cy.wait(1000)

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })



        cy.log('33 - Completo Mais - Assistência Km ilimitado / Serviços à residência')

        //@referencia
        cy.get('#checkbox-4').click();
        cy.wait(1000)

        ////////////////////////////////

        //@Referencia
        cy.get('#checkbox-5').click();
        cy.wait(1000)

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        //@Livre escolha
        cy.get('#checkbox-6').click();
        cy.wait(1000)

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        //----------------------------------------------------------------------------------------//
        //                                         CARRO RESERVA                                       //
        //----------------------------------------------------------------------------------------//


        // cy.log('Não quero contratar')

        //@NAO QUERO CONTRATAR
        // cy.get('#assistencia-1')
        //     .uncheck()

        // @@ nao mexe no premio


        //////
        //     cy.log('Carro reserva porte básico - Essencial 7 dias')

        //     //opcao CarroReserva 1
        //     cy.get('#checkbox-7').click()
        //     cy.wait(1000)

        //     //@Referencia
        //     cy.get('#checkbox-8').click();
        //     cy.wait(1000)

        //     cy.get('#txtPremioOferta').then(($premio) => {
        //         PremioTotal = novoPremioTotal;
        //         novoPremioTotal = $premio.text().trim();
        //         expect(novoPremioTotal).not.to.eq(PremioTotal);
        //     })

        //     //@Livre escolha
        //     cy.get('#checkbox-9').click();
        //     cy.wait(1000)

        //     cy.get('#txtPremioOferta').then(($premio) => {
        //         PremioTotal = novoPremioTotal;
        //         novoPremioTotal = $premio.text().trim();
        //         expect(novoPremioTotal).not.to.eq(PremioTotal);
        //     })


        // @NovoSegurado
    })
})