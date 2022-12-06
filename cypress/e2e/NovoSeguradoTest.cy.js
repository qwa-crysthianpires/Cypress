/// <reference types="cypress" />

import '../support/commands'
import '../support/variaveis'

describe("Novo Segurado", () => {

    it("Dados do Segurado", () => {

        cy.visit('http://192.168.1.131:9090/#/cotacao').wait(10000)
        // cy.visit('http://192.168.1.131:9090/#/oferta/3000148483/1/1/1').wait(10000)

        //@ Variaveis
        let PremioTotal = 0
        let novoPremioTotal = 0

        let idFull = ''
        let nomeId = ''
        let numId = 0
        let checkboxFinal = ''
        let numId2 = 0

        let checkboxVidroNqueroContratar = ''
        let radiobuttonVidros76 = ''
        let radiobuttonVidrosReferenciada = ''
        let radiobuttonVidrosLivreEscolha = ''

        let idHTML = ''
        let idSeparado = ''
        let idNome = ''
        let idNumeral = ''

        // Stella
        // const cpfSegurado = '227.827.558-54' 
        // const nomeSegurado = 'Stella Cristiane Laís Nascimento'
        // const nascSegurado = '24/03/1995'

        // const cpfSegurado = '756.538.098-96'
        const cpfSegurado = '216.810.208-23'
        const nomeSegurado = 'Benedito Giovanni Almeida'
        const nascSegurado = '13/08/1996'
        const cepSegurado = '16901-852'

        cy.modal_BoasVindas()

        //--------------------------------------------------------------------------------------//
        //-------------------------@---SEGURADO-NOVO--------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.get("#ipt-cpfCnpj-segurado").click().type(cpfSegurado).should("have.value", cpfSegurado).wait(1000)
        // cy.get("#inp-nome-novo-segurado").type(nomeSegurado).should("have.value", nomeSegurado)
        // cy.get("#ipt-picker-inp-dataNascimento-novo-segurado").click({ force: true }).type(nascSegurado).should("have.value", nascSegurado)
        // cy.get("#btn-lbl-select-sexo-novo-segurado").click({ force: true })
        // cy.get("#btn-item-text-select-sexo-novo-segurado-1").click({ force: true })

        //--------------------------------------------------------------------------------------//
        //-----------------------------CARRO-NOVO-----------------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.get('.input__toggle__btn').shadow().find('div').find('input').first().check({ force: true })
        cy.get("#btn-lbl-select-ano-fabricacao").click({ force: true }).wait(1000)
        cy.get("#btn-item-select-ano-fabricacao-1").click({ force: true })
        cy.wait(1000).get("#btn-lbl-select-ano-modelo2").click({ force: true }).wait(1000)
        cy.get("#btn-item-select-ano-modelo2-1").click({ force: true }).wait(1000)
        cy.get("#ipt-inp-modeloVeiculo").click({ force: true }).type("Gol")
        cy.get('#autocomplete-item-5206').click({ force: true }).wait(1000)
        cy.get('#chkb-veiculoZeroQuilometro').shadow().find('div').find('input').check({ force: true }).wait(2000)
        cy.get("#btn-lbl-btn-slct-tipo-uso").click({ force: true })
        cy.get("#btn-item-btn-slct-tipo-uso-0").click({ force: true })
        cy.get("#ipt-ipt-cep-component-endereco").click({ force: true }).type(cepSegurado).should("have.value", cepSegurado).wait(1000)
        cy.get("#tag-ipt-cep-component-endereco-0").click().wait(1000)

        cy.get("#bt-buscar-ofertas-novo").click({ force: true })

        //--------------------------------------------------------------------------------------//
        //------------------------------------RESULTADO-----------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.wait(60000)
        cy.modal_CotacoesConcorrentes()

        cy.log('Padronizando')
        // cy.get('#cross-selling-1').find('div').find(':nth-child(2)').find('div').find('div').find('fp-checkbox').shadow().find('div').find('input').should('exist').uncheck({ force: true }).wait(3000)
        cy.get('#cross-selling-1').find('div').find(':nth-child(3)').find('div').find('div').find('fp-checkbox').shadow().find('div').find('input').should('exist').uncheck({ force: true }).wait(3000)
        cy.get('#label-premio-riscado-1')
            .then(($btn) => {
                PremioTotal = $btn.text().trim()
            })

        // cy.log('Ativando Cartão Porto')
        // cy.intercept('PUT', 'http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamento/**/ofertacruzadacartaoporto').as('AtivandoCartaoPorto')
        // cy.get('#cross-selling-1').find('div').find(':nth-child(2)').find('div').find('div').find('fp-checkbox').shadow().find('div').find('input').should('exist').check({ force: true }).wait(2000)
        // cy.wait('@AtivandoCartaoPorto')
        //     .then((xhr) => {
        //         console.log(xhr)
        //         expect(xhr.response.statusCode).be.eq(200)
        //     })

        cy.log('Ativando o Checkbox do RE')
        cy.intercept('POST', 'http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentosRE').as('AtivandoRE')
        cy.get('#cross-selling-1').find('div').find(':nth-child(3)').find('div').find('div').find('fp-checkbox').shadow().find('div').find('input').should('exist').check({ force: true }).wait(3000)
        cy.wait('@AtivandoRE')
            .then((xhr) => {
                console.log(xhr)
                expect(xhr.response.statusCode).be.eq(200)
            })

        cy.wait(5000)
        cy.log('RE -> Padronizando Casa 1 Quarto')
        cy.get('#cross-selling-1').find('div').find(':nth-child(3)').find('div').find(':nth-child(4)').find(':nth-child(2)').find('p').find('a').click({ force: true })
        cy.get('.plano-residencial').find('div').find('div').find('div').find('div').find(':nth-child(2)').find('fp-radiobutton').find('div').find('input').check({ force: true })
        cy.get('#btn-lbl-select-plano-residencial').click({ force: true })
        cy.get('#btn-item-select-plano-residencial-0').click({ force: true })
        cy.get('#btn-aplicar-modal-planos').click({ force: true })
        cy.wait(2000).wait(3000)
        cy.get('#label-premio-riscado-1').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim()
            expect(novoPremioTotal).not.to.eq(PremioTotal)
        })

        cy.log('RE -> Padronizando Casa 3 Quartos')
        cy.get('#cross-selling-1').find('div').find(':nth-child(3)').find('div').find(':nth-child(4)').find(':nth-child(2)').find('p').find('a').click({ force: true })
        cy.get('.plano-residencial').find('div').find('div').find('div').find('div').find(':nth-child(2)').find('fp-radiobutton').find('div').find('input').check({ force: true })
        cy.get('#btn-lbl-select-plano-residencial').click({ force: true })
        cy.get('#btn-item-select-plano-residencial-2').click({ force: true })
        cy.get('#btn-aplicar-modal-planos').click({ force: true })
        cy.wait(3000)
        cy.wait(2000).get('#label-premio-riscado-1').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim()
            expect(novoPremioTotal).not.to.eq(PremioTotal)
        })

        cy.log('RE -> Padronizando Casa 3 Quartos')
        cy.get('#cross-selling-1').find('div').find(':nth-child(3)').find('div').find(':nth-child(4)').find(':nth-child(2)').find('p').find('a').click({ force: true })
        cy.get('.plano-residencial').find('div').find('div').find('div').find('div').find(':nth-child(3)').find('fp-radiobutton').find('div').find('input').check({ force: true })
        cy.get('#btn-lbl-select-plano-residencial').click({ force: true })
        cy.get('#btn-item-select-plano-residencial-2').click({ force: true })
        cy.get('#btn-aplicar-modal-planos').click({ force: true })
        cy.wait(3000)
        cy.wait(2000).get('#label-premio-riscado-1').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim()
            expect(novoPremioTotal).not.to.eq(PremioTotal)
        })

        cy.get('#bt-personalizar-oferta-1').click({ force: true }).wait(60000)



        //--------------------------------------------------------------------------------------//
        //------------------------------------PERSONALIZAR--------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('@ Valor Base -> Padronizando')
        cy.get('#btn-lbl-btn-slct-casco').click({ force: true })
        cy.get('#btn-item-btn-slct-casco-0').click({ force: true })
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-0').click({ force: true })
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-3').click({ force: true })
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(3000)

        cy.log('@Padronizando para 1%')
        cy.intercept('POST', 'http://192.168.1.131:9090/api/automovel/cotacao/v1/lmi/depreciacao/').as('alterandoValorBase1')
        cy.get('#input-valor-base-variacao-opcionais').clear({ force: true }).type(1.00)
        cy.wait('@alterandoValorBase1')

        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($btn) => {
                PremioTotal = $btn.text().trim()
                cy.log('Premio: ' + PremioTotal)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.intercept('POST', 'http://192.168.1.131:9090/api/automovel/cotacao/v1/lmi/depreciacao/').as('alterandoValorBase20')
        cy.log('@ Valor Base -> 20% ')
        cy.get('#input-valor-base-variacao-opcionais').clear({ force: true }).type(-20.00).should('have.value', '-20,00%', '-20%')
        cy.wait('@alterandoValorBase20').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.intercept('POST', 'http://192.168.1.131:9090/api/automovel/cotacao/v1/lmi/depreciacao/').as('alterandoValorBase5')
        cy.log('@ Valor Base -> 5% ')
        cy.get('#input-valor-base-variacao-opcionais').clear({ force: true }).type(5.00)
        cy.wait('@alterandoValorBase5').then((xhr) => {console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)})
        cy.wait(10000)
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)})
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })


        //--------------------------------------------------------------------------------------//
        //---------------------------------COOBERTURAS------------------------------------------//
        //--------------------------------------------------------------------------------------//
        cy.log('@Padronizando o Casco // casco -> desativado')
        cy.get('#checkbox-cobertura-casco').shadow().find('div').find('input').should('exist').uncheck({ force: true }).wait(5000)
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($btn) => {
                PremioTotal = $btn.text().trim()
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.log('Ativando o checkbox do @CASCO')
        cy.get('#checkbox-cobertura-casco').shadow().find('div').find('input').should('exist').check({ force: true })
        cy.wait(5000)

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.log('Compreensiva / Valor de Mercado / Obrigatória')
        cy.get('#btn-lbl-btn-slct-casco').click({ force: true })
        cy.get('#btn-item-btn-slct-casco-0').click({ force: true })
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-0').click({ force: true })
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-3').click({ force: true })
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.log('Compreensiva / Valor de Mercado / 25%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-0').click({ force: true })
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.log('Cobertura -> Compreensiva / Valor de Mercado / 175%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-2').click({ force: true })
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.log('Compreensiva / Valor Determinado / Obrigatória')
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-1').click({ force: true })
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-3').click({ force: true })
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.log('Compreensiva / Valor Determinado / 25%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-0').click({ force: true })
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.log('Compreensiva / Valor Determinado / 175%')
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-7').click({ force: true })
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.log('Incêndio e Roubo / Valor de Mercado / Obrigatória')
        cy.get('#btn-lbl-btn-slct-casco').click({ force: true })
        cy.get('#btn-item-btn-slct-casco-1').click({ force: true })
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-0').click({ force: true })
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cy.log('Incêndio e Roubo / Valor Determinado / Obrigatória')
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })        //      $Modalidade$
        cy.get('#btn-item-btn-slct-modalidade-seguro-1').click({ force: true })     // @    Valor Determinado
        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('RecalculandoValorBase5')
        cy.btn_recalcular()
        cy.wait('@RecalculandoValorBase5').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })


        cy.log('Compreensiva / Valor de Mercado / Obrigatória')
        cy.get('#btn-lbl-btn-slct-casco').click({ force: true })
        cy.get('#btn-item-btn-slct-casco-0').click({ force: true })
        cy.get('#btn-lbl-btn-slct-modalidade-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-modalidade-seguro-0').click({ force: true })
        cy.get('#btn-lbl-btn-slct-franquia-seguro').click({ force: true })
        cy.get('#btn-item-btn-slct-franquia-seguro-3').click({ force: true })

        cy.intercept('POST', `http://192.168.1.131:9090/api/automovel/cotacaobff/v1/cotacoes/**/orcamentos`).as('Recalculando9')
        cy.btn_recalcular()
        cy.wait('@Recalculando9').then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).be.eq(200)
        })
        cy.wait(10000)



        //--------------------------------------------------------------------------------------//
        //-----------------------ACESSÓRIOS, EQUIPAMENTOS OU CARROCERIAS------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Acessórios - Index 1 - ')
        cy.get('#icon-btnIconeAddAcessorio').should('to.be.visible').click({ force: true }).wait(2000)
        cy.get('.card_fields_tipoCobertura').find('div.radiobutton').find('fp-radiobutton').find('div').find('input').as('Input que tenha ID').first().invoke('attr', 'id').as('idValue')
        cy.get('@idValue')
            .then((idValue) => {
                idFull = idValue
                idFull = idFull.split('-')
                nomeId = idFull[0]
                numId = (idFull[1])
                checkboxFinal = '#' + nomeId + '-' + numId

                cy.wait(3000)
                cy.get(checkboxFinal).click({ force: true })

                cy.log('Acessórios - > Ar Condicionado R$1,00')
                cy.get('#btn-lbl-campoTipoAcessorio0').click({ force: true })
                cy.get('#btn-item-campoTipoAcessorio0-1').click({ force: true })
                cy.get('#campoLimite0').click({ force: true }).clear({ force: true }).type('1,00')
                cy.wait(3000)
                cy.get('#txtPremioOferta').then(($premio) => {
                    PremioTotal = novoPremioTotal
                    novoPremioTotal = $premio.text().trim()
                    expect(novoPremioTotal).not.to.eq(PremioTotal)
                })

                cy.log('Acessórios - > Ar Condicionado R$3.671,45')
                cy.get('#campoLimite0').click({ force: true }).clear({ force: true }).type('3.671,45')
                cy.wait(3000)
                cy.get('#txtPremioOferta').then(($premio) => {
                    PremioTotal = novoPremioTotal
                    novoPremioTotal = $premio.text().trim()
                    expect(novoPremioTotal).not.to.eq(PremioTotal)
                })

                cy.get('#icon-btnIconeAddAcessorio').should('to.be.visible').click({ force: true }).wait(2000)
                numId2 = parseInt(numId) + 3
                checkboxFinal = '#' + nomeId + '-' + numId2

                cy.log('Referência')
                cy.log('Acessórios - > Ar Condicionado R$1,00')
                cy.wait(2000)
                cy.get(checkboxFinal).click({ force: true })

                cy.get('#btn-lbl-campoTipoAcessorio1').click({ force: true })
                cy.get('#btn-item-campoTipoAcessorio1-1').click({ force: true })
                cy.get('#campoLimite1').click({ force: true }).clear({ force: true }).type('1,00')
                cy.wait(3000)
                cy.get('#txtPremioOferta').then(($premio) => {
                    PremioTotal = novoPremioTotal
                    novoPremioTotal = $premio.text().trim()
                    expect(novoPremioTotal).not.to.eq(PremioTotal)
                })

                cy.log('Acessórios - > Ar Condicionado R$10.347,30')
                cy.get('#campoLimite1').click({ force: true }).clear({ force: true }).type('10.347,30')
                cy.wait(3000)
                cy.get('#txtPremioOferta').then(($premio) => {
                    PremioTotal = novoPremioTotal
                    novoPremioTotal = $premio.text().trim()
                    expect(novoPremioTotal).not.to.eq(PremioTotal)
                })
            })



        //--------------------------------------------------------------------------------------//
        //-------------------------------------VIDROS-------------------------------------------//
        //--------------------------------------------------------------------------------------//
        //$$
        cy.log('Vidros ->  NãoQueroContratar')
        cy.get('#cobertura-vidro').shadow().find('div').find('input').uncheck({ force: true }).wait(1000)
        // Contratando Vidros
        cy.get('#cobertura-vidro').shadow().find('div').find('input').check({ force: true }).wait(1000)

        cy.get('#cobertura-vidro').shadow().find('div').find('input').check({ force: true }).wait(2000)

        cy.get('#txtPremioOferta').then(($premio) => {
            novoPremioTotal = $premio.text().trim()
        })

        cy.get('#cobertura-vidro').shadow().find('div').find('input').uncheck()
        cy.get('.card').find('fp-card').find('div').find('div').find('fp-radiobutton').find('div').find('input').as('Input que tenha ID').first().invoke('attr', 'id').as('idValue')
        cy.get('@idValue').then((idValue) => {
            idHTML = idValue
            idSeparado = idHTML.split('-')
            idNome = idSeparado[0]
            idNumeral = (idSeparado[1])

            radiobuttonVidros76 = '#' + idNome + '-' + idNumeral
            cy.get(radiobuttonVidros76)
                .check({ force: true })
                .wait(2000)
        })

        cy.log('Vidros ->  Referenciada')
        cy.get('.row-options').find('div').find('fp-radiobutton').find('div').find('input').as('Input que tenha ID').first().invoke('attr', 'id').as('idValue')
        cy.get('@idValue')
            .then((idValue) => {
                idHTML = idValue
                idSeparado = idHTML.split('-')
                idNome = idSeparado[0]
                idNumeral = (idSeparado[1])

                radiobuttonVidrosReferenciada = '#' + idNome + '-' + idNumeral
                cy.wait(2000)
                cy.get(radiobuttonVidrosReferenciada).check({ force: true }).wait(2000)

                cy.get('#txtPremioOferta').then(($premio) => {
                    PremioTotal = novoPremioTotal
                    novoPremioTotal = $premio.text().trim()
                    expect(novoPremioTotal).not.to.eq(PremioTotal)
                })

                cy.log('Vidros ->  Livre Escolha')
                idNumeral = parseInt(idNumeral) + 1
                radiobuttonVidrosLivreEscolha = '#' + idNome + '-' + idNumeral
                cy.get(radiobuttonVidrosLivreEscolha).check({ force: true }).wait(5000)

                cy.get('#txtPremioOferta').then(($premio) => {
                    PremioTotal = novoPremioTotal
                    novoPremioTotal = $premio.text().trim()
                    expect(novoPremioTotal).not.to.eq(PremioTotal)
                })

            })

        //--------------------------------------------------------------------------------------//
        //---------------------------------ASSISTENCIAS-----------------------------------------//
        //--------------------------------------------------------------------------------------//


        let radiobuttonAssistencia31 = ''
        let idradiobuttonAssistencia31 = ''

        // @ 32
        let radiobuttonAssistencia32Completo = ''
        let radiobuttonAssistencia32Referenciada = ''
        let radiobuttonAssistencia32LivreEscolha = ''

        //33
        let radiobuttonAssistencia33Completo = ''
        let radiobuttonAssistencia33Referenciada = ''
        let radiobuttonAssistencia33LivreEscolha = ''

        //31
        cy.get('.card_header').find('div').find('fp-radiobutton').find('div').find('input').as('Input que tenha ID').first().invoke('attr', 'id').as('idValue')
        cy.get('@idValue').then((idValue) => {
            idHTML = idValue
            idSeparado = idHTML.split('-')
            idNome = idSeparado[0]
            idNumeral = (idSeparado[1])

            cy.log('31 -> Essencial')
            idradiobuttonAssistencia31 = '#' + idNome + '-' + idNumeral
            cy.wait(2000)
            cy.get(idradiobuttonAssistencia31).click({ force: true }).wait(2000)

            //@Ativando 32
            cy.log('32 -> Completo')
            idNumeral = parseInt(idNumeral) + 1
            radiobuttonAssistencia32Completo = '#' + idNome + '-' + idNumeral
            cy.get(radiobuttonAssistencia32Completo).click({ force: true }).wait(2000)

            cy.log('32 -> Referenciada')
            idNumeral = parseInt(idNumeral) + 1
            radiobuttonAssistencia32Referenciada = '#' + idNome + '-' + idNumeral
            cy.get(radiobuttonAssistencia32Referenciada).click({ force: true }).wait(2000)
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })


            cy.log('32 -> Livre escolha')
            idNumeral = parseInt(idNumeral) + 1
            radiobuttonAssistencia32LivreEscolha = '#' + idNome + '-' + idNumeral
            cy.get(radiobuttonAssistencia32LivreEscolha).click({ force: true }).wait(2000)
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })


            //@Ativando 33
            cy.log('33 -> Completo')
            idNumeral = parseInt(idNumeral) + 1
            radiobuttonAssistencia33Completo = '#' + idNome + '-' + idNumeral
            cy.get(radiobuttonAssistencia33Completo).click({ force: true }).wait(2000)


            cy.log('33 -> Referenciada')
            idNumeral = parseInt(idNumeral) + 1
            radiobuttonAssistencia33Referenciada = '#' + idNome + '-' + idNumeral
            cy.get(radiobuttonAssistencia33Referenciada).click({ force: true }).wait(2000)
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

            cy.log('33 -> Livre escolha')
            idNumeral = parseInt(idNumeral) + 1
            radiobuttonAssistencia33LivreEscolha = '#' + idNome + '-' + idNumeral
            cy.get(radiobuttonAssistencia33LivreEscolha).click({ force: true }).wait(2000)
            cy.get('#txtPremioOferta').then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        })

        
        //--------------------------------------------------------------------------------------//
        //---------------------------------CARRO RESERVA----------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('ESSENCIAL OPCAO')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(2)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').first().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('ESSENCIAL LIVRE ESCOLHA')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(2)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').last().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('COMPLETO OPCAO')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(3)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').first().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(3)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').last().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('CONFORTO OPCAO')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(4)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').first().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('CONFORTO LIVRE ESCOLHA')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(4)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').last().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('VIP OPCAO')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(5)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').first().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('VIP LIVRE ESCOLHA')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(5)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').last().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('VIP OPCAO')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(6)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').first().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('VIP LIVRE ESCOLHA')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(6)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').last().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('VIP OPCAO')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(7)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').first().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('VIP LIVRE ESCOLHA')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(7)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').last().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('VIP OPCAO')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(8)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').first().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('VIP LIVRE ESCOLHA')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(8)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').last().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })


        cy.log('VIP OPCAO')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(9)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').first().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })

        cy.log('VIP LIVRE ESCOLHA')
        cy.get('app-assistencias').find('div').find(':nth-child(2)').find(':nth-child(9)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').last().check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta')
            .then(($premio) => {
                PremioTotal = novoPremioTotal
                novoPremioTotal = $premio.text().trim()
                expect(novoPremioTotal).not.to.eq(PremioTotal)
            })


        //--------------------------------------------------------------------------------------//
        //--------------------------------DESPESAS-EXTRAORDINÁRIAS------------------------------//
        //--------------------------------------------------------------------------------------//
        cy.log('Padronizando')
        cy.get('#assistencia-2').shadow().find('div').find('input').check({ force: true }).wait(1000).uncheck({ force: true })
        cy.get('app-assistencias').find('div').find(':nth-child(3)').find(':nth-child(2)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim()
            expect(novoPremioTotal).not.to.eq(PremioTotal)
        })



        //--------------------------------------------------------------------------------------//
        //------------------------------------FRAQNUIASS----------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.log('Padronizando')
        cy.get('#assistencia-3').shadow().find('div').find('input').check({ force: true }).wait(2000)
        cy.get('#assistencia-3').shadow().find('div').find('input').uncheck({ force: true }).wait(2000)

        cy.get('app-assistencias').find('div').find(':nth-child(4)').find(':nth-child(2)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim()
            expect(novoPremioTotal).not.to.eq(PremioTotal)
        })

        cy.get('app-assistencias').find('div').find(':nth-child(4)').find(':nth-child(3)').find('fp-card').find('div').find(':nth-child(1)').find('fp-radiobutton').find('div').find('input').check({ force: true }).wait(3000)
        cy.recalcular_final()
        cy.wait(10000)
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim()
            expect(novoPremioTotal).not.to.eq(PremioTotal)
        })

        //--------------------------------------------------------------------------------------//
        //---------------------------DEMAIS-ASSISTENCIAs----------------------------------------//
        //--------------------------------------------------------------------------------------//

        cy.get('app-assistencias').find('div').find(':nth-child(5)').find(':nth-child(2)').find('fp-card').find('div').find(':nth-child(1)').find('fp-checkbox').shadow().find('div').find('input').check({ force: true }).wait(3000)
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim()
            expect(novoPremioTotal).not.to.eq(PremioTotal)
        })

        cy.get('app-assistencias').find('div').find(':nth-child(5)').find(':nth-child(3)').find('fp-card').find('div').find(':nth-child(1)').find('fp-checkbox').shadow().find('div').find('input').check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim()
            expect(novoPremioTotal).not.to.eq(PremioTotal)
        })

        cy.get('app-assistencias').find('div').find(':nth-child(5)').find(':nth-child(4)').find('fp-card').find('div').find(':nth-child(1)').find('fp-checkbox').shadow().find('div').find('input').check({ force: true }).wait(2000)
        cy.get('#txtPremioOferta').then(($premio) => {
            PremioTotal = novoPremioTotal
            novoPremioTotal = $premio.text().trim()
            expect(novoPremioTotal).not.to.eq(PremioTotal)
        })
        //@ submit
        cy.get('.desktop-buttons > .ng-star-inserted > #elaborar-proposta').click({ force: true })
        cy.wait(40000)












        //finish it
    })
    //finish describe
})