/// <reference types="cypress" />

describe('Personalizar', () => {
    before(() => {

        cy.visit('http://192.168.1.131:9090/#/oferta/2000040349/1/30/1');
        cy.wait(10000);// 10 ~30

    })

    it('Valor Base 5%', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;
        const btnSalvar = cy.get('#btn-salvar')

        cy.get('#txtPremioOferta').then(($btn) => {
            novoPremioTotal = $btn.text().trim();
        })
        // .type(5)-> 0.01%
        cy.get('#input-valor-base-variacao-opcionais')
            .clear()
            .type(5.00)
            .should('have.value', '5,00%')
            .wait(5000)

        btnSalvar.click();

        //*[@id="recalcular"]
        let btnRecalcular = cy.get('#recalcular')

        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click()
                .wait(15000)
            PremioTotal = novoPremioTotal;
            cy.get('#txtPremioOferta').then(($premio) => {
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })
        } else {
            // chamar a função denovo
        }
        // 
    })

    it('Valor Base 20%', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;
        const btnSalvar = cy.get('#btn-salvar')

        cy.get('#txtPremioOferta').then(($btn) => {
            novoPremioTotal = $btn.text().trim();
        })

        cy.log('Valor Base com -20%')
        cy.get('#input-valor-base-variacao-opcionais')
            .clear()
            .type(-20.00)
            .should('have.value', '-20,00%', '-20%') // Premio =  R$ 165.556,80
            .wait(5000);

        btnSalvar.click();

        var btnRecalcular = cy.get('#recalcular');
        if (btnRecalcular.should('be.visible')) {
            btnRecalcular.click()
                .wait(15000);

            cy.get('#txtPremioOferta').then(($premio) => {
                novoPremioTotal = $premio.text().trim();
                expect(novoPremioTotal).not.to.eq(PremioTotal);
            })
        } else {
            // chamar a função denovo
        }
        // 
    })

    it('Coberturas - Casco - DESATIVADO', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);
        // const btnCasco = cy.get('#tgl-cross-selling-on-3');
        // cy.get('.coberturas__casco__checkbox')
        //     .should('not.be.checked')

        // @    Casco
        cy.log('Desativado o checkbox do @CASCO')
        btnCasco.shadow()
            .find('div')
            .find('input').should('exist').uncheck();

        cy.wait(5000);
        PremioTotal = novoPremioTotal;

        let btnRecalcular2 = cy.get('#recalcular')
        cy.wait(5000)

        btnRecalcular2.click({ force: true })
        cy.wait(15000)
        cy.get('#txtPremioOferta').then(($premio) => {
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })
    });

    it('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> Obrigatória', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);

        // @ativando o checkbox
        cy.get('#checkbox-cobertura-casco').click({ force: true })

        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> Obrigatória');
        // @    Cobertura
        cy.get('#btn-lbl-btn-slct-casco').click({ force: true })        //      $Cobertura$
        cy.get('#btn-item-btn-slct-casco-0').click({ force: true })     // @    Compreensiva

        // @     Modalidade
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })        //      $Modalidade$
        cy.get('#btn-item-btn-slct-modalidade-seguro-0').click({ force: true })     // @    Valor de Mercado

        // @     Franquia
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })                      //      $Franquia$
        cy.get('#btn-item-btn-slct-franquia-seguro-0').click({ force: true }).as('index 0')     //  Obrigatoria

        // @    Recalulado Obrigatório
        btnRecalcular = cy.get('#recalcular')
        if (btnRecalcular.should('to.be.visible')) {
            btnRecalcular.click({ force: true })
                .wait(15000);
        }

        cy.get('.modal-content')
            .should('be.visible').should('contain', 'Regra de vistoria prévia alterada')
            .then(($dialog) => {
                cy.wrap($dialog).find('#btn-vistoria-previa-agendamento-ok').contains("Ok").click()
            });

        PremioTotal = novoPremioTotal;
        cy.get('#txtPremioOferta').then(($premio) => {
            novoPremioTotal = $premio.text().trim();
            expect(novoPremioTotal).not.to.eq(PremioTotal);
        })

    });

    it.skip('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> 200%', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);
        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor de Mercado / Franquia -> 200%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-1').click({ force: true })// @ Franquia - 200% da Obrigatoria

        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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
        // @@@@Função Recalcular e Comparar Valor

    })

    it.skip('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> 125%', () => {

        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor de Mercado / Franquia -> 125%')

        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-2').click({ force: true }).as('index 2') // // @ Franquia - 125% da Obrigatoria
        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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
        // @@@@Função Recalcular e Comparar Valor

    })

    it.skip('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> 150%', () => {

        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor de Mercado / Franquia -> 150%')

        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-3').click({ force: true }).as('index 3')// // @ Franquia - 150% da Obrigatoria
        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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
        // @@@@Função Recalcular e Comparar Valor

    })
    it.skip('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> 175%', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);


        cy.log('Cobertura -> Compreensiva / Modalidade -> Valor de Mercado / Franquia -> 175%')

        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-4').click({ force: true }).as('index 3')// // @ Franquia - 175% da Obrigatoria
        cy.wait(1000)

        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-4').click({ force: true }).as('index 3')// // @ Franquia - 175% da Obrigatoria
        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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
        // @@@@Função Recalcular e Comparar Valor

    });


    it.skip('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> Obrigatória', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);

        // @     Modalidade
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })        //      $Modalidade$
        cy.get('#btn-item-btn-slct-modalidade-seguro-1').click({ force: true })     // @    Valor de Mercado
        // @     Franquia
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })                      //      $Franquia$
        cy.get('#btn-item-btn-slct-franquia-seguro-0').click({ force: true }).as('index 0')     //  Obrigatoria
        cy.wait(1000)
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
        // @@@@Função Recalcular e Comparar Valor
    });


    it.skip('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 200%', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);


        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-1').click({ force: true })// @ Franquia - 200% da Obrigatoria

        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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
        // @@@@Função Recalcular e Comparar Valor


    });

    it.skip('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 125%', () => {

        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 125%')

        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-2').click({ force: true }).as('index 2') // // @ Franquia - 125% da Obrigatoria
        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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
        // @@@@Função Recalcular e Comparar Valor

    });


    it.skip('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 150%', () => {
        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 150%')

        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-3').click({ force: true }).as('index 3')// // @ Franquia - 150% da Obrigatoria
        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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
        // @@@@Função Recalcular e Comparar Valor

    });

    it.skip('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 175%', () => {

        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);

        cy.log('Cobertura -> Compreemsiva / Modalidade -> Valor Determinado / Franquia -> 175%')

        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })// @ Franquia
        cy.get('#btn-item-btn-slct-franquia-seguro-4').click({ force: true }).as('index 3')// // @ Franquia - 175% da Obrigatoria
        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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
        // @@@@Função Recalcular e Comparar Valor

    });

    it.skip('Cobertura -> Incêndio e Rouo / Modalidade -> Valor de Mercado / Franquia -> Obrigatória', () => {

        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);
        cy.log('Cobertura -> Incêndio e Rouo / Modalidade -> Valor de Mercado / Franquia -> Obrigatória')
        // @    Cobertura
        cy.get('#btn-lbl-btn-slct-casco').click({ force: true })        //      $Cobertura$
        cy.get('#btn-item-btn-slct-casco-1').click({ force: true })     // @    Compreensiva
        //  @     Modalidade
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })        //      $Modalidade$
        cy.get('#btn-item-btn-slct-modalidade-seguro-0').click({ force: true })     // @    Valor de Mercado
        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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
        // @@@@Função Recalcular e Comparar Valor

    });

    it.skip('Cobertura -> Incêndio e Roubo / Modalidade -> Valor Determinado / Franquia -> Obrigatória', () => {

        let PremioTotal = 0;
        let novoPremioTotal = 0;

        const btnSalvar = cy.get('#btn-salvar')
        const btnCasco = cy.get('#checkbox-cobertura-casco');
        cy.wait(5000);


        cy.log('Cobertura -> Incêndio e Roubo / Modalidade -> Valor Determinado / Franquia -> Obrigatória')
        //  @     Modalidade
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })        //      $Modalidade$
        cy.get('#btn-item-btn-slct-modalidade-seguro-1').click({ force: true })     // @    Valor Determinado
        cy.wait(1000)
        // @@@@Função Recalcular e Comparar Valor
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

    });

    it.skip('RCFV - DANOS MATERIAS', () => {


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
        // 125k


    });

    it.skip('RCFV - DANOS CORPORAIS', () => {


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
        // 125k

    });

    it.skip('RCFV - ACIDENTES PESSOAIS PASSAGEIROS', () => {
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



    });

    it('RCFV - DANOS MORAIS E ESTETICOS', () => {

        //           RCFV - DANOS MORAIS E ESTETICOS
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
        // 125k
        const opc2_index3 = cy.get('[ng-reflect-index="1"] > .cobertura-range > .range > .slider-item > .slider > .slider__box > .input > .input__dropdown > .enabled-dropdown > #box- > .dropdown-item-box > #btn-item--3 > #btn-item-text--3')
        //@ nao me orgulho dessa forma, mas vai melhorar
        opc2_index3.click({ force: true })

    });


    // it('Novo Segurado', () => {
    //     const cpfSegurado = '227.827.558-54' //felipe: 470.539.618-93 
    //     const nomeSegurado = 'Stella Cristiane Laís Nascimento'
    //     const nascSegurado = '24/03/1995'

    //     cy.wait(10000)

    //     // @ Fechando o modal
    //     cy.get('.coachmark-modal__content')
    //         .should('be.visible').should('contain', 'Um novo sistema de cálculo para você')
    //         .then(($dialog) => {
    //             cy.wrap($dialog).find('#icon-btnCoachmarkClose').click()
    //         });


    //     //  @   SEGURADO NOVO
    //     // cy.get('#checkbox-0').click();

    //     //  @CLASSE BONUS
    //     // cy.get('#btn-lbl-select-bonus')
    //     //     .invoke('show')
    //     //     .select('title=0')
    //     //     .click();

    //     // @    CPF segurado
    //     cy.get("#ipt-cpfCnpj-segurado").click()
    //         .type(cpfSegurado).should("have.value", cpfSegurado);

    //     /*
    //     // @    Nome do Segurado
    //     cy.get("#inp-nome-novo-segurado")
    //         .type(nomeSegurado)
    //         .should("have.value", nomeSegurado);

    //     // @    Data de Nascimento
    //     cy.get("#ipt-picker-inp-dataNascimento-novo-segurado").click()
    //         .type(nascSegurado)
    //         .should("have.value",nascSegurado);

    //     // @    Sexo
    //     cy.get("#btn-lbl-select-sexo-novo-segurado").click({ force: true });
    //     cy.get("#btn-item-text-select-sexo-novo-segurado-1").click({ force: true });
    //     */

    // });
    // it('Carro', () => {


    //     // @ Placa
    //     cy.get('#ipt-inp--placa', { timeout: 10000 })
    //         .type('GDN-2736').should("have.value", "GDN-2736");

    //     // @ Ano de Fabricação
    //     cy.get("#btn-lbl-select-ano-fabricacao").click({ force: true });
    //     cy.get("#btn-item-select-ano-fabricacao-3").click({ force: true }); // 2019 -3

    //     //  Ano do Modelo
    //     cy.wait(1000).get("#btn-lbl-select-ano-modelo2").click();
    //     cy.get("#btn-item-select-ano-modelo2-1").click(); //2019
    //     // cy.get('btn-item-select-ano-modelo2-0').click() //2020

    //     // Modelo do Veículo
    //     cy.get("#ipt-inp-modeloVeiculo").click().type("Civic");
    //     cy.get("#autocomplete-item-5129").click(); //civc
    //     //cy.get("#autocomplete-item-245").click(); // corola

    //     //  Uso do Veículo
    //     cy.get("#btn-lbl-btn-slct-tipo-uso").click({ force: true });
    //     cy.get("#btn-item-btn-slct-tipo-uso-0").click({ force: true });

    //     // @    CEP
    //     cy.get("#ipt-ipt-cep-component-endereco").click()
    //         .type("01203001").should("have.value", "01203-001");

    //     cy.wait(1000);
    //     cy.get("#tag-ipt-cep-component-endereco-0").click();

    //     // @    Submit 
    //     cy.get("#bt-buscar-ofertas-novo").click();

    //     cy.wait(20000);

    //     // cy.get('#id_concorrentes_cotacao_title')
    //     //    cy.get('#btn-concorrentes-cotacao-ok')

    //     /**
    //      * 
    //      * cy.get('#modal-title-rastreamento')
    //         cy.get('#btn-enviar-confirmacao')

    //         cy.get('#btn-enviar-confirmacao')
    //         cy.get('#bt-personalizar-oferta-1')

    //          label do valor
    //         cy.get('#label-premio-riscado-1')
    //      */
    // });

})