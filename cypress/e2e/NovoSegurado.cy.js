/// <reference types="cypress" />

describe("Novo Segurado", () => {

    it("Dados do Segurado", () => {
        cy.visit('http://192.168.1.131:9090/#/cotacao').wait(10000);

        cy.get('.coachmark-modal__content')
            .should('be.visible').should('contain', 'Um novo sistema de cálculo para você')
            .then(($dialog) => {
                cy.wrap($dialog)
                    .find('#icon-btnCoachmarkClose')
                    .click()
            });

        // @Segurado
        let PremioTotal = 0;
        let novoPremioTotal = 0;
        const cpfSegurado = '227.827.558-54'
        // const nomeSegurado = 'Stella Cristiane Laís Nascimento'
        // const nascSegurado = '24/03/1995'
        // cy.get('#checkbox-0')
        //     .click();

        // cy.get('#btn-lbl-select-bonus')
        //     .invoke('show')
        //     .select('title=0')
        //     .click();

        cy.get("#ipt-cpfCnpj-segurado").click()
            .type(cpfSegurado)
            .should("have.value", cpfSegurado)
            .wait(1000);

        // cy.get("#inp-nome-novo-segurado")
        //     .type(nomeSegurado)
        //     .should("have.value", nomeSegurado);

        // cy.get("#ipt-picker-inp-dataNascimento-novo-segurado").click()
        //     .type(nascSegurado)
        //     .should("have.value", nascSegurado);

        // cy.get("#btn-lbl-select-sexo-novo-segurado")
        //     .click({ force: true });

        // cy.get("#btn-item-text-select-sexo-novo-segurado-1")
        //     .click({ force: true });




        //@Carro
        cy.get('#ipt-inp--placa')
            .type('GDN-2736')
            .should("have.value", "GDN-2736")
            .wait(3000);

        cy.get('#btn-lbl-select-ano-fabricacao')
            .click({ force: true })
            .wait(1000);
        cy.get("#btn-item-select-ano-fabricacao-3")
            .click({ force: true })
            .wait(1000);

        cy.get("#btn-lbl-select-ano-modelo2")
            .click({ force: true })
            .wait(1000);
        cy.get("#btn-item-select-ano-modelo2-1")
            .click({ force: true })
            .wait(1000);

        cy.get("#ipt-inp-modeloVeiculo")
            .click({ force: true })
            .type("Civic")
            .wait(1000);

        cy.get("#autocomplete-item-5129")
            .click({ force: true })
            .wait(1000);

        cy.get("#btn-lbl-btn-slct-tipo-uso")
            .click({ force: true });
        cy.get("#btn-item-btn-slct-tipo-uso-0")
            .click({ force: true });

        cy.get("#ipt-ipt-cep-component-endereco")
            .click({ force: true })
            .type("16901852")
            .should("have.value", "16901-852")
            .wait(1000);

        cy.get("#tag-ipt-cep-component-endereco-0")
            .click()
            .wait(1000);

        cy.get("#bt-buscar-ofertas-novo")
            .click()
            .wait(30000);

        // 2ªPAGINA
        cy.get('.modal-content')
            .should('be.visible').should('contain', 'Cotações concorrentes')
            .then(($dialog) => {
                cy.wrap($dialog)
                    .find('#btn-concorrentes-cotacao-ok')
                    .contains("Ok")
                    .click()
                    .wait(1000);
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
                .should('exist').uncheck()
                .wait(1000);
        })

        cy.log('Desativando o Checkbox do RE')
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
        cy.get('#bt-personalizar-oferta-1')
            .click()
            .wait(30000)


        // @SegundaPagina
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

        cy.log('Valor Base com -20%')
        cy.get('#input-valor-base-variacao-opcionais')
            .clear()
            .type(-20.00)
            .should('have.value', '-20,00%', '-20%')
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

        // @Coberturas
        btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);

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

        // cy.get('.modal-content')
        //     .should('exist').should('contain', 'Regra de vistoria prévia alterada')
        //     .then(($dialog) => {
        //         cy.wrap($dialog).find('#btn-vistoria-previa-agendamento-ok').contains("Ok").click()
        //     });


        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> Obrigatória');
        cy.log('Ativando o checkbox do @CASCO')
        cy.get('#checkbox-cobertura-casco')
            .shadow()
            .find('div')
            .find('input').should('exist').check()
            .wait(5000);

        cy.get('#btn-lbl-btn-slct-casco')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-casco-0')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-0')
            .click({ force: true })
        cy.get('#btn-lbl-btn-slct-franquia-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-0')
            .click({ force: true }).as('index 0')

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('be.visible')) {
            btnRecalcular.click()
                .wait(15000);
        }

        // cy.get('.modal-content')
        //     .should('be.visible').should('contain', 'Regra de vistoria prévia alterada')
        //     .then(($dialog) => {
        //         cy.wrap($dialog).find('#btn-vistoria-previa-agendamento-ok').contains("Ok").click()
        //     });

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> 200%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-1')
            .click({ force: true })
            .wait(1000);

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> 125%')
        cy.get('#btn-item-btn-slct-franquia-seguro-2')
            .click({ force: true }).as('index 2')
            .wait(3000);

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })





        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> 150%')
        cy.get('#btn-item-btn-slct-franquia-seguro-3')
            .click({ force: true }).as('index 3')
            .wait(1000);

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> 175%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-4')
            .click({ force: true }).as('index 3')

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor Determinado / Franquia -> Obrigatória')
        cy.get('#btn-lbl-btn-slct-modalidade-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-1')
            .click({ force: true })
        cy.get('#btn-lbl-btn-slct-franquia-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-0')
            .click({ force: true }).as('index 0')

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor Determinado / Franquia -> 200%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-1')
            .click({ force: true })
            .wait(1000);

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor Determinado / Franquia -> 125%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-2')
            .click({ force: true }).as('index 2')
        cy.wait(1000);

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor Determinado / Franquia -> 150%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-3')
            .click({ force: true }).as('index 3')
        cy.wait(1000);

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })


        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor Determinado / Franquia -> 175%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-4')
            .click({ force: true })
            .as('index 3')
            .wait(1000)

        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

        cy.log('Cobertura -> Incêndio e Rouo / Modalidade -> Valor de Mercado / Franquia -> Obrigatória')
        cy.get('#btn-lbl-btn-slct-casco')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-casco-1')
            .click({ force: true })
        cy.get('#btn-lbl-btn-slct-modalidade-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-0')
            .click({ force: true })
            .wait(1000);

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

        cy.log('Cobertura -> Incêndio e Roubo / Modalidade -> Valor Determinado / Franquia -> Obrigatória')
        cy.get('#btn-lbl-btn-slct-modalidade-seguro')
            .click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-1')
            .click({ force: true })
            .wait(1000)

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

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })


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


        cy.get('#labelRCFA-DanosMateriais > .slider__label__icon > .ng-star-inserted')


        cy.get('[ng-reflect-index="1"]')
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
        primeira = cy.get('[ng-reflect-index="1"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--2')
        primeira.click({ force: true }).wait(2000);

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

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })


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

        ultima = cy.get('[ng-reflect-index="3"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--8')
        ultima.click({ force: true }).wait(2000);

        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal;
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })



        let idFull = '';
        let nomeId = '';
        let numId = 0;
        let checkboxFinal = '';
        let numId2 = 0;

        cy.log('Acessórios - Index 1 - ')
        const btnAdicionarAcessorio = cy.get('#icon-btnIconeAddAcessorio');
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
            cy.get('#btn-lbl-campoTipoAcessorio0')
                .click({ force: true })
            cy.get('#btn-item-campoTipoAcessorio0-1')
                .click({ force: true })

            cy.get('#campoLimite0')
                .click()
                .clear()
                .type('1,00')
                .wait(3000);;

            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal;
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })

            cy.log('Acessórios - > Ar Condicionado R$10.347,30')
            cy.get('#campoLimite0')
                .click()
                .clear()
                .type('10.347,30')
                .wait(3000);

            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal;
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })


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

            cy.get('#btn-lbl-campoTipoAcessorio1')
                .click({ force: true })
            cy.get('#btn-item-campoTipoAcessorio1-1')
                .click({ force: true })

            cy.get('#campoLimite1')
                .click()
                .clear()
                .type('1,00')
                .wait(3000);

            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal;
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })

            cy.log('Acessórios - > Ar Condicionado R$10.347,30')
            cy.get('#campoLimite1')
                .click()
                .clear()
                .type('10.347,30')
                .wait(3000);

            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal;
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })

        })

        // it
    })
    // describe
})