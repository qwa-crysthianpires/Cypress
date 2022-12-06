const variables = {

    COTACAO: {

        MODAL: {
            BOASVINDAS: '.coachmark-modal__content',
        },
        SUSEP: {

            SUSEP_DROPDOWN: '#btn-lbl-slct-susep',

        },
        CORRETAGEM: {

            ALTERAR_CORRETAGEM: '#link-alterar-cotacao',

            SUSEP_1: {

                SUSEP_1_CHECKBOX: '#checkbox-9',
                SUSEP_1: '#SUSEP_2',
                SUSEP_PORCENTAGEM_1: '#percentual_2',

            },

            SUSEP_2: {

                SUSEP_2_CHECKBOX: '#checkbox-9',
                SUSEP_2: '#SUSEP_2',
                SUSEP_PORCENTAGEM_2: '#percentual_2',
            },

            SUSEP_3: {
                SUSEP_2_CHECKBOX: '#checkbox-10',
                SUSEP_3: '#SUSEP_3',
                SUSEP_PORCENTAGEM_3: '#percentual_3',
            }

        },
        
        TIPO_SEGURO: {


            SEGURADO_NOVO: '#checkbox-0',
            RENOVACAO_CONGENERE: '#checkbox-1',

            CLASSE_BONUS: {
                CLASSE_BONUS_DROPDOWN: '#btn-lbl-select-bonus',
                CLASSE_BONUS_0: '#btn-item-select-bonus-0',
                CLASSE_BONUS_1: '#btn-item-select-bonus-1',
                CLASSE_BONUS_2: '#btn-item-select-bonus-2',
                CLASSE_BONUS_3: '#btn-item-select-bonus-3',
                CLASSE_BONUS_4: '#btn-item-select-bonus-4',
                CLASSE_BONUS_5: '#btn-item-select-bonus-5',
                CLASSE_BONUS_6: '#btn-item-select-bonus-6',
                CLASSE_BONUS_7: '#btn-item-select-bonus-7',
                CLASSE_BONUS_8: '#btn-item-select-bonus-8',
                CLASSE_BONUS_9: '#btn-item-select-bonus-9'
            }

        },

        DADOS_SEGURADO: {
            CPF: '#ipt-cpfCnpj-segurado',
            NOME: '#inp-nome-novo-segurado',
            NASCIMENTO: 'ipt-picker-inp-dataNascimento-novo-segurado',
            SEXO: {
                SEXO_DROPDOWN: '#btn-lbl-select-sexo-novo-segurado',
                SEXO_MASCULINO: '#btn-item-text-select-sexo-novo-segurado-0',
                SEXO_FEMININO: '#btn-item-text-select-sexo-novo-segurado-1'
            },
            CEP: '#ipt-ipt-cep-component-endereco',

        },
        CORRETOR: {
            SEGURO_CORRETOR_SIM: '#checkbox-2',
            SEGURO_CORRETOR_NAO: '#checkbox-3',
            CORRETOR_SEGURADO_SIM: '#checkbox-4',
            CORRETOR_SEGURADO_NAO: '#checkbox-5',
        },
        DADOS_VEICULO: {
            PLACA: {
                PLACA: '#ipt-inp--placa',
                NSEIAPLACA: '.input__toggle__btn'
            },
            ANO_FABRICACAO: {
                ANO_FABRICACAO_DROPDOWN: '#btn-lbl-select-ano-fabricacao',
                ANO_FABRICACAO_2022: '#btn-item-select-ano-fabricacao-0',
                ANO_FABRICACAO_2021: '#btn-item-select-ano-fabricacao-1'
            },
            ANO_MODELO: {
                ANO_MODELO_DROPDOWN: '#btn-lbl-select-ano-modelo2',
                ANO_MODELO_ATUAL: '#btn-item-select-ano-modelo2-0',
                ANO_MODELO_ANTERIOR: '#btn-item-select-ano-modelo2-1',
            },
            MODELO: {
                MODELO_ESCRITA: '#ipt-inp-modeloVeiculo',
                MODELO_CLICK_GOL1: '#autocomplete-item-5206',
            },
            VEICULO_ZERO_KM: '#chkb-veiculoZeroQuilometro',
            USO_VEICULO: {
                USO_VEICULO_DROPDOWN: '#btn-lbl-btn-slct-tipo-uso',
                USO_PARTICULAR: '#btn-item-text-btn-slct-tipo-uso-0',
                USO_FRETE: '#btn-item-text-btn-slct-tipo-uso-1',
                USO_TAXI: '#btn-item-text-btn-slct-tipo-uso-2',
                USO_MISTO: '#btn-item-text-btn-slct-tipo-uso-3',
                USO_LOCADORES: '#btn-item-text-btn-slct-tipo-uso-4',
                USO_AMBULANCIA: '#btn-item-text-btn-slct-tipo-uso-5',
                USO_AUTO_ESCOLA: '#btn-item-text-btn-slct-tipo-uso-6',
                USO_BOMBEIROS: '#btn-item-text-btn-slct-tipo-uso-7',
                USO_POLICIAMENTO: '#btn-item-text-btn-slct-tipo-uso-8',
                USO_TRANSP_FUNCIONARIO_CLIENTES: '#btn-item-text-btn-slct-tipo-uso-9',
                USO_TAXI_DRIVER: '#btn-item-text-btn-slct-tipo-uso-10',
                USO_DIFERENCIADOS: '#btn-item-text-btn-slct-tipo-uso-11',
                USO_TRANSP_PASSAGEIROS_APPLICATIVOS: '#btn-item-text-btn-slct-tipo-uso-12',
            }

        },

        DADOS_CONDUTOR: {
            // ..
        },
        SUBMIT: {
            BUSCAR_OFERTA: '#bt-buscar-ofertas-novo'
        }
    },

    RESULTADO: {

        RESULTADOS: {

            NUMERO_COTACAO: {},
            NUMERO_ALTERACAO: {},
            DATA_VALIDADE_CALCULO: {},
            SEGURADO: {},
            CPF: {},
            VEICULO: {},
            CLASSE_BONUS: {},

            GERAR_PDF: {},
            HISTORICO_OFERTAS: {},
            DESATIVAR_MARCADO: {},

        },

        OFERTA: {

            TITULO: '',
            NUMERO_OFERTA: '',
            PREMIO: '#txtPremioOferta',
            DESCONTOS: '',
            FORMAS_PAGAMENTOS: '',

            COMISSAO: {
                EDITAR_COMISSAO: '',
                VISUALIZAR_COMISSAO: '',
                COMISSAO_NUMERAL: '',
            },

            FRANQUIA: '',
            ASSISTENCIA: '',
            LMI_VALOR_BASE: '',

            COBERTURAS: {
                VIDROS: {
                    OPCAO: '',
                },
                RASTREADOR: {
                    OPCAO: ''
                },

                VANTAGENS: {
                    CARTAO_PORTO_SEGURO_PRE_APROVADO  :'#tgl-cross-selling-on-4',
                    RE: '#tgl-cross-selling-on-3',
                    TRANSITO_MAIS_GENTIL: '#tgl-cross-selling-on-148'
                }


            },

        },

        SUBMIT: '#bt-personalizar-oferta-1'
    },

    PERSONALIZAR: {

        OFERTA_PORTO_SEGURO_AUTO: {},

        VALOR_BASE: {

            NUMERO_VARIACAO: '#input-valor-base-variacao-opcionais',
            LMI: '#input-valor-base-valor-base',
            SLIDER_RANGE: '#input-range-valor-base',

        }, COBETURAS: {

        },
        COBETURAS_RCFA: {

        }, ACESSORIOS: {

        },
        VIDROS: {

        },
        ASSISTENCIAS: {

        },
        CARRO_RESERVA: {

        },
        DESPESAS_EXTRAORDINARIAS: {

        },
        FRANQUIAS: {

        },
        DEMAIS_ASSISTENCIAS: {

        },
        PROGRAMAS_RELACIONAMENTOS: {

        },
        VANTAGENS: {

        },

    },

    BTN: {

        SALVAR: '#btn-salvar',
        RECALCULAR: '#recalcular',
        PREMIO: '#txtPremioOferta',
        RE: '#tgl-cross-selling-on-3',
        PREMIO: '#txtPremioOferta',
        CASCO: '#checkbox-cobertura-casco',
    },
    DADOS_SEGURADO: {
        TIPO_SEGURO: '#inp-nome-novo-segurado',
        RENOVACAO_CONGENERE: '',
        CLASSE_BONUS: '',

    },
    PESSOA: {


    },
    CEP: {
        CEP_PERNOITE: '',
        NAOSEIOCEP: '',
        ESTADO: '',
        CIDADE_LOCALIDADE: '',
        TIPO_LOGRADOURO: '',
        LOGRADOURO: '',
    },

    MESSAGE: {


        MODAL_COTACOES_CONCORRENTES: '.modal-content',
        MODAL_TRACKER_OBRIGATORIO: '.modal-content',
        MODAL_COTACOES_PENDENTE: '.modal-content',

    },
    
    PROPOSTA: {// TELA PORPOSTA 
        DADOS_SEGURADO: {

            TIPO_DOCUMENTO_DROPDOWN: '#btn-lbl-dropdownTipoDocumentoProposta',

            RNE: '#btn-item-dropdownTipoDocumentoProposta-0',
            CNH: '#btn-item-dropdownTipoDocumentoProposta-1',
            RG: '#btn-item-dropdownTipoDocumentoProposta-2',
            CIP: '#btn-item-dropdownTipoDocumentoProposta-3',
            PASSAPORTE: {
                PASSAPORTE: '#btn-item-dropdownTipoDocumentoProposta-4',
                PAIS_EMISSAO: '',

            },

            //@ANSWER

        },

        NUMERO_DOCUMENTO: {

            RESPOTA: '#documentoProposta',
        },

        ORGAO_EXPEDIDOR: {

        },

        DATA_EXPEDICAO: {

        },

        PAIS_NASCIMENTO: {

        },

        PAIS_RESIDENCIA: {

        },

        PROFISSAO: {
            PROFISSAO_TYPE:'#ipt-autocompleteProfissaoProposta',
            PROFISSAO_CLICK : 'autocomplete-items-autocompleteProfissaoProposta'
        },

        FAIXA_RENDA_MENSAL: {

            DROPDOWN : '#btn-lbl-dropdownFaixaRendaMensal',
            ATE_2500 : '#btn-item-dropdownFaixaRendaMensal-0',
            DE_2500_ATE_5000 : '#btn-item-dropdownFaixaRendaMensal-1',
            DE_5001_ATE_10000 : '#btn-item-dropdownFaixaRendaMensal-2',
            ACIMA_10000 : '#btn-item-dropdownFaixaRendaMensal-3',

        },

        PESSOA_POLITICAMENTE_EXPOSTA: {
            DROPDOWN: '#btn-lbl-pep-dropdown',
            SIM:'#btn-item-pep-dropdown-0',
            NAO:'#btn-item-pep-dropdown-1',
            RELACIONAMENTO_PROXIMO:'#btn-item-pep-dropdown-2'

        },



        DADOS_VEICULO: {
            PLACA: {},
            CHASSI: {},
            NUMERO_VISTORIA_PREVIA: {},
            NUMERO_COBERTURA_PROVISORIA: {},
            DATA_COBERTURA_PROVISORIA: {},
            RENAVAM: {},
            NOTA_FISCAL: {},
            DATA_EMISSAO_NF: {},
            DATA_SAIDA_VEICULO: {},

            INCLUIR_CAUSA_BENEFICIARIA: {},
            NOME_BENEFICIARIO: {},
        },

        DADOS_CONTATO: {

        },

        DADOS_PAGAMENTO_PROPOSTA: {
            FORMA_PAGAMENTO: {},
            VALOR_SEGURO: {},
            RESPONSAVEL_FINANCEIRO: {
                SEGURADO: {},
                OUTRO: {
                    OUTRO_RESPOANSAVEL: '',
                    CPF_CNPJ: '',
                    NOME: '',
                    DATA: '',
                    SEXO: '',
                    ENDERECO_RESPOANSAVEL_SEGURADO: '',
                    TIPO_TELEFONE: '',
                    NUMERO_TELEFONE: '',
                    EMAIL: '',
                },
            },
            TERMOS_CONTRATO: {},

        },
    },
}

export default variables;