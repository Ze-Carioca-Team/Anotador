from flask import Flask, json
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

information = {
  "dataLearning":
  {
    "dialogs":
      [
        {
            "id": 123456,
            "dialog_domain": "creditos_placa_errada",
            "turns": [
                {
                    "speaker": "agent",
                    "utterance": "Seja Bem vindo a ConectCar. Meu nome é Tarcisio, com quem eu falo? Olá, você ainda está Online?",
                    "utterance_delex": "Seja Bem vindo a ConectCar. Meu nome é [atendente], com quem eu falo? Olá, você ainda está Online?",
                    "action": "[cumprimento][req_nome]",
                    "slot-values": {
                        "atendente": "Tarcisio"
                    },
                    "turn-num": 1
                },
                {
                    "speaker": "client",
                    "utterance": "Olá. Gean.",
                    "utterance_delex": "Olá. [cliente].",
                    "intent": "[info_nome]",
                    "slot-values": {
                        "cliente": "Gean"
                    },
                    "turn-num": 2
                },
                {
                    "speaker": "agent",
                    "utterance": "Bom dia Em que eu posso te ajudar?",
                    "utterance_delex": "Bom dia Em que eu posso te ajudar?",
                    "action": "[cumprimento][como_ajudar]",
                    "slot-values": {},
                    "turn-num": 3
                },
                {
                    "speaker": "client",
                    "utterance": "Bom dia. Gostaria de saber se é possível. Vcs mandarem um boleto para pagamento do saldo negativo.",
                    "utterance_delex": "Bom dia. Gostaria de saber se é possível. Vcs mandarem um boleto para pagamento do saldo negativo.",
                    "intent": "[req_boleto_saldo]",
                    "slot-values": {},
                    "turn-num": 4
                },
                {
                    "speaker": "agent",
                    "utterance": "Não consigo gerar uma Boleto com o saldo negativo, o boleto com o valor minimo é de R$50,00. Olá, você ainda está Online?",
                    "utterance_delex": "Não consigo gerar uma Boleto com o saldo negativo, o boleto com o valor minimo é de [valor_monetario]. Olá, você ainda está Online?",
                    "action": "[negativa_procedimento]",
                    "slot-values": {
                        "valor_monetario": "R$50,00"
                    },
                    "turn-num": 5
                },
                {
                    "speaker": "client",
                    "utterance": "Ok Obrigado.",
                    "utterance_delex": "Ok Obrigado.",
                    "intent": "[confirmacao][agradecimento]",
                    "slot-values": {},
                    "turn-num": 6
                },
                {
                    "speaker": "agent",
                    "utterance": "Imagina. O seu e-mail e telefone permanece atualizados para envio do protocolo? nathalia32@live.com (92) 51264-0863. Protocolo: 39759130025262488931 Qualquer duvida retorna o contato. A ConectCar Agradece o seu Contato. Se for possível permaneça Online e Avalie o meu atendimento. Tenha um Bom Dia!",
                    "utterance_delex": "Imagina. O seu e-mail e telefone permanece atualizados para envio do protocolo? [email] [telefone]. Protocolo: [protocolo] Qualquer duvida retorna o contato. A ConectCar Agradece o seu Contato. Se for possível permaneça Online e Avalie o meu atendimento. Tenha um Bom Dia!",
                    "action": "[conf_telefone][conf_email][info_protocolo][despedida]",
                    "slot-values": {
                        "email": "nathalia32@live.com",
                        "telefone": "(92) 51264-0863",
                        "protocolo": "39759130025262488931"
                    },
                    "turn-num": 7
                }
            ]
        },
    ],
  },
  "metaLearning": [
    {
        "int": 13,
        "ent": 6,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    1
                ],
                "topic": -1,
                "entities": "Seja Bem vindo a ConectCar. Meu nome é ###Tarcisio&&&0###, com quem eu falo? Olá, você ainda está Online?"
            },
            {
                "intentions": [
                    2
                ],
                "topic": -1,
                "entities": "Olá. ###Gean&&&3###."
            },
            {
                "intentions": [
                    0,
                    3
                ],
                "topic": -1,
                "entities": "Bom dia Em que eu posso te ajudar?"
            },
            {
                "intentions": [
                    4
                ],
                "topic": -1,
                "entities": "Bom dia. Gostaria de saber se é possível. Vcs mandarem um boleto para pagamento do saldo negativo."
            },
            {
                "intentions": [
                    5
                ],
                "topic": -1,
                "entities": "Não consigo gerar uma Boleto com o saldo negativo, o boleto com o valor minimo é de ###R$50,00&&&2###. Olá, você ainda está Online?"
            },
            {
                "intentions": [
                    6,
                    7
                ],
                "topic": -1,
                "entities": "Ok Obrigado."
            },
            {
                "intentions": [
                    8,
                    9,
                    10,
                    11
                ],
                "topic": -1,
                "entities": "Imagina. O seu e-mail e telefone permanece atualizados para envio do protocolo? ###nathalia32@live.com&&&8### ###(92) 51264-0863&&&7###. Protocolo: ###39759130025262488931&&&6### Qualquer duvida retorna o contato. A ConectCar Agradece o seu Contato. Se for possível permaneça Online e Avalie o meu atendimento. Tenha um Bom Dia!"
            }
        ]
    },
    {
        "int": 14,
        "ent": 8,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    3
                ],
                "topic": -1,
                "entities": "Olá, tudo bem? Meu nome é ###Miriam&&&0###. Em que posso ajudar?"
            },
            {
                "intentions": [
                    0,
                    12
                ],
                "topic": -1,
                "entities": "Boa noite. Eu percebi que cadastrei a placa do meu veículo errada. Inverti as letras."
            },
            {
                "intentions": [
                    13
                ],
                "topic": -1,
                "entities": "Qual seria a placa correta?"
            },
            {
                "intentions": [
                    14
                ],
                "topic": -1,
                "entities": "###OUE1000&&&1###."
            },
            {
                "intentions": [
                    7,
                    15,
                    10,
                    9,
                    8
                ],
                "topic": -1,
                "entities": "Obrigada pela confirmação. ###Dione&&&3### sua solicitação foi realizada com sucesso, necessário aguardar o prazo de ###06 horas&&&4### para Rodovias Federais e ###07 minutos&&&4### para Rodovias Estaduais para utilização, o saldo foi transferido automaticamente. Somente verificar atualização pelo APP ou Site. O protocolo desta solicitação/informação é: ###62308798557784749091&&&6###, será encaminhado também via SMS: ###(68) 159277335&&&7### ou e-mail: ###heitor64@yahoo.com.br&&&8###. Estão atualizados? 😉."
            },
            {
                "intentions": [
                    6,
                    7
                ],
                "topic": -1,
                "entities": "Ok. Obrigado."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Por nada! A ConectCar agradece seu contato e estamos à disposição sempre que precisar. Tenha uma ótima noite e até a próxima. Desejo tudo de bom! 👍. Peço a gentileza de aguardar para a avaliação do meu atendimento. Sua participação e opinião são muito importantes para a melhoria contínua do nosso serviço! 😘 Boa semana! Se cuida! 🙏."
            }
        ]
    },
    {
        "int": 5,
        "ent": 2,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    1
                ],
                "topic": -1,
                "entities": "Boa tarde, seja bem-vindo(a) Ao atendimento ConectCar, meu nome é ###Djalma&&&0###, com quem eu falo por gentileza?"
            },
            {
                "intentions": [
                    7,
                    16
                ],
                "topic": -1,
                "entities": "Obrigado ###Djalma&&&0###, mas já falei por telefone."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Por nada! A ConectCar agradece seu contato e estamos à disposição sempre que precisar. E por fim peço a gentileza de aguardar para a avaliação do meu atendimento. Sua participação e opinião são muito importantes. :) Tenha uma ótima tarde e até a próxima! Desejo tudo de bom!"
            }
        ]
    },
    {
        "int": 4,
        "ent": 1,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    3
                ],
                "topic": -1,
                "entities": "Boa tarde, seja bem-vindo(a) Ao atendimento ConectCar, meu nome é ###Juan&&&0###, como posso ajudar?"
            },
            {
                "intentions": [
                    16
                ],
                "topic": -1,
                "entities": "Não mais."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Tudo bem. A ConectCar agradece seu contato e estamos à disposição sempre que precisar. E por fim peço a gentileza de aguardar para a avaliação do meu atendimento. Sua participação e opinião são muito importantes. :) Tenha uma ótima tarde e até a próxima! Desejo tudo de bom!"
            }
        ]
    },
    {
        "int": 13,
        "ent": 5,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    3
                ],
                "topic": -1,
                "entities": "Olá, tudo bem? Meu nome é ###Adelina&&&0###. Em que posso ajudar?"
            },
            {
                "intentions": [
                    0,
                    12
                ],
                "topic": -1,
                "entities": "Tudo bem e você ###Adelina&&&0###? Eu solicitei pra alterar o saldo da placa do meu carro antigo (Que vendi) Pra placa do meu carro novo. Mas ainda não mudou... Tô precisando usar urgente."
            },
            {
                "intentions": [
                    0,
                    10
                ],
                "topic": -1,
                "entities": "Estou bem, obrigada por perguntar. 😄 ###Luis&&&3###, o prazo são de até ###06 dias&&&4### corridos, onde completaria amanhã. Então tem até ###segunda&&&12### para ocorrer a transferência do saldo."
            },
            {
                "intentions": [
                    17
                ],
                "topic": -1,
                "entities": "Se completaria amanhã o ideal é entrar amanhã né? Que bom que está bem 🥰."
            },
            {
                "intentions": [
                    18
                ],
                "topic": -1,
                "entities": "Mas como é final de semana, poderá ser creditado até o dia seguinte."
            },
            {
                "intentions": [
                    6
                ],
                "topic": -1,
                "entities": "Ok."
            },
            {
                "intentions": [
                    19
                ],
                "topic": -1,
                "entities": "Auxílio em algo mais neste atendimento?"
            },
            {
                "intentions": [
                    18,
                    7
                ],
                "topic": -1,
                "entities": "Somente obrigado."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Por nada! Foi ótimo interagir com você! A Conectcar agradece o seu contato desejo um excelente dia! 😄. Peço a gentileza de aguardar para a avaliação do meu atendimento. Sua participação e opinião são muito importantes para a melhoria contínua do nosso serviço! 😘 Bom final de semana! Se cuida! 🙏."
            }
        ]
    },
    {
        "int": 13,
        "ent": 7,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    3
                ],
                "topic": -1,
                "entities": "Boa tarde, seja bem-vindo(a) Ao atendimento ConectCar, meu nome é ###Otacilio&&&0###, como posso ajudar?"
            },
            {
                "intentions": [
                    20
                ],
                "topic": -1,
                "entities": "Olá, coloquei um crédito de ###50&&&2### em um veículo errado e queria colocar no outro que está cadastrado. O veículo errado é o da placa DIX. E queria colocar no da placa ###FQI 5056&&&1###."
            },
            {
                "intentions": [
                    21
                ],
                "topic": -1,
                "entities": "Vou solicitar o estorno da recarga pra você, só um momento!"
            },
            {
                "intentions": [
                    7
                ],
                "topic": -1,
                "entities": "Obrigado."
            },
            {
                "intentions": [
                    9,
                    8
                ],
                "topic": -1,
                "entities": "Seu e-mail é ###alvaro48@hotmail.com&&&8### e telefone ###015985247434&&&7###?"
            },
            {
                "intentions": [
                    6
                ],
                "topic": -1,
                "entities": "Isso."
            },
            {
                "intentions": [
                    10,
                    19
                ],
                "topic": -1,
                "entities": "O protocolo desse atendimento é ###32033923477603069703&&&6###, e será enviado por e-mail e SMS. No prazo de ###5 dias úteis&&&4### será estornada a recarga pra você! Tem mais alguma coisa que posso te ajudar? Você está online?"
            },
            {
                "intentions": [
                    18,
                    7
                ],
                "topic": -1,
                "entities": "Estou. Era só isso mesmo. Muito obrigado."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Por nada! A ConectCar agradece seu contato e estamos à disposição sempre que precisar. E por fim peço a gentileza de aguardar para a avaliação do meu atendimento. Sua participação e opinião são muito importantes. :) Tenha uma ótima tarde e até a próxima! Desejo tudo de bom!"
            }
        ]
    },
    {
        "int": 12,
        "ent": 3,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0
                ],
                "topic": -1,
                "entities": "Seja bem-vindo a Conectcar! Bom dia! Meu nome é ###Shirlei&&&0###. Tudo bem?"
            },
            {
                "intentions": [
                    0,
                    22
                ],
                "topic": -1,
                "entities": "Bom dia ###Shirlei&&&0###, tudo bem, obrigada por perguntar. E você? Eu tenho apenas uma dúvida. Eu troquei a placa do meu carro pela mercosul e já atualizei no meu aplicativo. é Só isto? Não precisa trocar o adesivo?"
            },
            {
                "intentions": [
                    15
                ],
                "topic": -1,
                "entities": "Após a troca é só aguardar ###6 horas&&&4### para utilizar o serviço!"
            },
            {
                "intentions": [
                    17
                ],
                "topic": -1,
                "entities": "Então é só atualizar no app como fiz né. Não precisa de mais nenhuma providência?"
            },
            {
                "intentions": [
                    6,
                    19,
                    23
                ],
                "topic": -1,
                "entities": "Exatamente, já fez o que tinha que ser feito, agora é só usufruir do serviço. Posso te ajudar em algo a mais? Você ainda está online?"
            },
            {
                "intentions": [
                    6,
                    18,
                    7
                ],
                "topic": -1,
                "entities": "Sim. Estou aqui. Não muito obrigada! Já esclareceu minha dúvida! Excelente semana para você com muita paz e Luz! 😉 🌹🌹."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Obrigada pelo contato foi um prazer te atender, estamos sempre a disposição para o que precisar. Peço que aguarde um momento para avaliar o meu atendimento! A ConectCar agradece, tenha uma ótima semana! Boas festas!!"
            }
        ]
    },
    {
        "int": 12,
        "ent": 11,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    1
                ],
                "topic": -1,
                "entities": "Boa noite, seja bem-vindo(a) Ao atendimento ConectCar, meu nome é ###Moacir&&&0###, com quem eu falo por gentileza?"
            },
            {
                "intentions": [
                    2,
                    0
                ],
                "topic": -1,
                "entities": "###Alex&&&3###. Boa Noite."
            },
            {
                "intentions": [
                    0,
                    3
                ],
                "topic": -1,
                "entities": "Boa noite ###Alex&&&3###, o que posso te auxiliar hoje?"
            },
            {
                "intentions": [
                    24
                ],
                "topic": -1,
                "entities": "###Moacir&&&0###, fiz a compra do adesivo, tenho duas dúvidas, sou cliente Itaú mastercard Black 1) Como faço para ter os ###24 meses&&&4### de isenção de mensalidade? 2) Os ###40 reais&&&2### do adesivo serão estornados ou creditados?"
            },
            {
                "intentions": [
                    25
                ],
                "topic": -1,
                "entities": "###Alex&&&3###, você já esta isento de ###36 mensalidades&&&4### por conta do cartão Black até ###2023&&&22###, e os ###40 reais&&&2### que você pagou no adesivo é creditado em até ###30 dias&&&4### corridos em seu saldo."
            },
            {
                "intentions": [
                    19
                ],
                "topic": -1,
                "entities": "ÓTimo, não preciso fazer mais nada?"
            },
            {
                "intentions": [
                    18
                ],
                "topic": -1,
                "entities": "Não, já esta tudo certo."
            },
            {
                "intentions": [
                    7
                ],
                "topic": -1,
                "entities": "ÓTimo, obrigado."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Por nada! A ConectCar agradece seu contato e estamos à disposição sempre que precisar. E por fim peço a gentileza de aguardar para a avaliação do meu atendimento. Sua participação e opinião são muito importantes. :) Tenha uma ótima noite e até a próxima! Desejo tudo de bom!"
            }
        ]
    },
    {
        "int": 18,
        "ent": 11,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    3,
                    23
                ],
                "topic": -1,
                "entities": "Olá, tudo bem? Meu nome é ###Joaquim&&&0###. Em que posso ajudar? Olá, você ainda está online?"
            },
            {
                "intentions": [
                    6,
                    0,
                    12
                ],
                "topic": -1,
                "entities": "Sim. Bom dia ###Joaquim&&&0###. Cadastrei a placa do meu carro errado. Tem como mudar?"
            },
            {
                "intentions": [
                    6,
                    26
                ],
                "topic": -1,
                "entities": "Sim. Peço que aguarde um momento que vou realizar a sua solicitação. Qualquer duvida, pode me chamar que estarei online. :)"
            },
            {
                "intentions": [
                    6
                ],
                "topic": -1,
                "entities": "Ok."
            },
            {
                "intentions": [
                    27,
                    28
                ],
                "topic": -1,
                "entities": "###Pedro&&&3###, seu e-mail e telefone em cadastro ###suelem31@yahoo.com.br&&&8### / ###(12) 360985257&&&7### Estão corretos?"
            },
            {
                "intentions": [
                    6
                ],
                "topic": -1,
                "entities": "Sim."
            },
            {
                "intentions": [
                    7,
                    15,
                    10
                ],
                "topic": -1,
                "entities": "###Pedro&&&3###, obrigado por aguardar. Finalizei a sua solicitação que gerou o numero de protocolo ###99275759347113373325&&&6###. Alteração da placa ###TFH 8417&&&1### para ###XQD3J99&&&1### realizada com sucesso. Peço que aguarde por gentileza o prazo de ###6 horas&&&4### para rodovias federais e ###7 minutos&&&4### para rodovias estaduais e estacionamentos."
            },
            {
                "intentions": [
                    6,
                    7
                ],
                "topic": -1,
                "entities": "Ok. Muito obrigado."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Estou finalizando nosso atendimento! Eu agradeço o seu contato, em nome da ConectCar e precisando de algo mais é só nos contatar! :) Peço a gentileza de aguardar para a avaliação do meu atendimento. Sua opinião nos ajuda a sempre melhorar nossos serviços! :-) Tenha um bom dia e até mais. :)"
            }
        ]
    },
    {
        "int": 8,
        "ent": 2,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    3
                ],
                "topic": -1,
                "entities": "Boa tarde, seja bem-vindo(a) Ao atendimento ConectCar, meu nome é ###Joelson&&&0###, como posso ajudar?"
            },
            {
                "intentions": [
                    0,
                    22
                ],
                "topic": -1,
                "entities": "Boa Tarde, ###Joelson&&&0###! Alterei minha placa para o padrão Mercosul. Como alterar na Conectcar?"
            },
            {
                "intentions": [
                    29
                ],
                "topic": -1,
                "entities": "Você vai no seu APP na opção 'Meus adesivos' ---> Vai nos 3 pontos que mostra ao lado da sua placa e vai na opção 'Alterar placa para o padrão mercosul'."
            },
            {
                "intentions": [
                    6,
                    7
                ],
                "topic": -1,
                "entities": "Ok. Entendido! Obrigado!"
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Por nada! A ConectCar agradece seu contato e estamos à disposição sempre que precisar. E por fim peço a gentileza de aguardar para a avaliação do meu atendimento. Sua participação e opinião são muito importantes. :) Tenha uma ótima tarde e até a próxima! Desejo tudo de bom para você."
            }
        ]
    },
    {
        "int": 15,
        "ent": 12,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    3
                ],
                "topic": -1,
                "entities": "Olá, tudo bem? Meu nome é ###Geovani&&&0###. Em que posso ajudar?"
            },
            {
                "intentions": [
                    12
                ],
                "topic": -1,
                "entities": "Quando cadastrei a placa coloquei uma letra errada. Eu coloquei ###FYZ5C90&&&1### Na vdd é ###JIG1J43&&&1###. Troquei o ###O&&&9### por ###S&&&9###."
            },
            {
                "intentions": [
                    26
                ],
                "topic": -1,
                "entities": "Vou alterar para você, ###Weslei&&&3###. Só um momento."
            },
            {
                "intentions": [
                    6
                ],
                "topic": -1,
                "entities": "Ok."
            },
            {
                "intentions": [
                    15,
                    10,
                    9,
                    8
                ],
                "topic": -1,
                "entities": "É Necessário aguardar ###07 minutos&&&4### para utilizar rodovias estaduais/estacionamentos e ###06 horas&&&4### para rodovias federais. O protocolo desta solicitação é: ###22327215036830237914&&&6###, será encaminhado também via SMS ###067837005021&&&7### e-mail ###heloisa95@gmail.com&&&8###, ambos estão corretos?"
            },
            {
                "intentions": [
                    6,
                    17
                ],
                "topic": -1,
                "entities": "Sim estão. Para estacionamentos ###7 minutos&&&4###?"
            },
            {
                "intentions": [
                    6
                ],
                "topic": -1,
                "entities": "Sim."
            },
            {
                "intentions": [
                    6,
                    7
                ],
                "topic": -1,
                "entities": "Ok. Obrigado."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Por nada! A ConectCar agradece seu contato e estamos à disposição sempre que precisar. E por fim peço a gentileza de aguardar para a avaliação do meu atendimento. Sua participação e opinião são muito importantes. :) Tenha uma ótima noite e até a próxima! Desejo tudo de bom!"
            }
        ]
    },
    {
        "int": 6,
        "ent": 2,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0
                ],
                "topic": -1,
                "entities": "Bom dia, meu nome é ###Edmilson&&&0###. Tudo bem?"
            },
            {
                "intentions": [
                    0
                ],
                "topic": -1,
                "entities": "Bom dia ###Edmilson&&&0###."
            },
            {
                "intentions": [
                    23
                ],
                "topic": -1,
                "entities": "Olá?"
            },
            {
                "intentions": [
                    16,
                    7
                ],
                "topic": -1,
                "entities": "Meu problema foi solucionado ontem via ligação telefônica. Muito obrigada pelo retorno."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Ah, que bom! :) Precisando de algo mais é só nos contatar!"
            }
        ]
    },
    {
        "int": 13,
        "ent": 5,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0
                ],
                "topic": -1,
                "entities": "Bom dia, meu nome é ###Murilo&&&0###. Tudo bem?"
            },
            {
                "intentions": [
                    0,
                    30
                ],
                "topic": -1,
                "entities": "Bom dia, tudo ###Murilo&&&0###... Minha dúvida, posso transferir o saldo do CC para outra placa/veículo?"
            },
            {
                "intentions": [
                    27,
                    28
                ],
                "topic": -1,
                "entities": "Antes de te passar as informações, pode, por gentileza, me informa o e-mail e celular cadastrados?"
            },
            {
                "intentions": [
                    31,
                    32
                ],
                "topic": -1,
                "entities": "###rayane23@hotmail.com&&&8### ###(46) 163433748&&&7###."
            },
            {
                "intentions": [
                    9,
                    18
                ],
                "topic": -1,
                "entities": "Seu e-mail está com ###alex6@hotmail.com&&&8###. Está correto? Referente a sua dúvida, não realizamos esse procedimento."
            },
            {
                "intentions": [
                    18,
                    7
                ],
                "topic": -1,
                "entities": "Já não tenho este e-mail... Ok, obrigada..."
            },
            {
                "intentions": [
                    33,
                    11
                ],
                "topic": -1,
                "entities": "Já fiz a alteração para você do e-mail. Por nada! Eu agradeço o seu contato, em nome da ConectCar e precisando de algo mais é só nos contatar! Peço que permaneça para a pesquisa, por gentileza! Tenha um bom dia e até breve!"
            }
        ]
    },
    {
        "int": 6,
        "ent": 2,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    1
                ],
                "topic": -1,
                "entities": "Boa noite sou o ###Edmilson&&&0###, falo com quem por gentileza?"
            },
            {
                "intentions": [
                    0,
                    16,
                    7
                ],
                "topic": -1,
                "entities": "Boa ###Edmilson&&&0###. Ja resolvi. Obg pelo retorno."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "De nada Peço a gentileza de aguarda a avaliação do meu atendimento Sua participação e opinião são muito importantes para a melhoria contínua de nossos serviços! 😉🚧🚗."
            }
        ]
    },
    {
        "int": 15,
        "ent": 14,
        "status": "active",
        "turns": [
            {
                "intentions": [
                    0,
                    3
                ],
                "topic": -1,
                "entities": "Olá, tudo bem? Meu nome é ###Vagner&&&0###. Em que posso ajudar?"
            },
            {
                "intentions": [
                    12
                ],
                "topic": -1,
                "entities": "Olá ###Vagner&&&0###. Eu havia conversado com alguém da connect semana passada. Informei que cadastrei errado a minha placa. O final eu havia colocado ###EAM 1444&&&1###. Mas o correto ###JVZ 1726&&&1### (###V&&&9### maiúsculo) Aí eu tentei alterar pelo app. E tinha uma opção de mercosul. Achei q pudesse ser. E mudou na hora para ###YKT-7281&&&1###. Meu carro eh da localiza e eles tem outro connect mas eu comprei o meu. Falaram q iriam mudar esse meu semana passada. Com ###5 dias úteis&&&4###. E até o momento não mudaram."
            },
            {
                "intentions": [
                    15,
                    26
                ],
                "topic": -1,
                "entities": "###Paloma&&&3###, vou arrumar para você. Só um momento!"
            },
            {
                "intentions": [
                    6
                ],
                "topic": -1,
                "entities": "Ok."
            },
            {
                "intentions": [
                    15,
                    10,
                    8,
                    9
                ],
                "topic": -1,
                "entities": "###Paloma&&&3###, é necessário aguardar ###07 minutos&&&4### para utilizar rodovias estaduais/estacionamentos e ###06 horas&&&4### para rodovias federais. O protocolo desta solicitação é ###27103422843616526994&&&6###, será encaminhado também via SMS ###(95) 27280-9717&&&7### ou e-mail ###joao36@live.com&&&8###, ambos estão corretos?"
            },
            {
                "intentions": [
                    6
                ],
                "topic": -1,
                "entities": "Ok perfeito. Estão sim."
            },
            {
                "intentions": [
                    19
                ],
                "topic": -1,
                "entities": "Ajudo em algo mais?"
            },
            {
                "intentions": [
                    18,
                    7
                ],
                "topic": -1,
                "entities": "Somente isso mesmo. Muitíssimo Obriagda 🏻."
            },
            {
                "intentions": [
                    11
                ],
                "topic": -1,
                "entities": "Por nada! A Conectcar agradece o contato, tenha uma ótima tarde! Se possível, participe da pesquisa de satisfação do meu atendimento."
            }
        ]
    }
]

}

@app.route("/")
def hello_world():
    time.sleep(5)
    response = app.response_class(response=json.dumps(information), status=200, mimetype='application/json')
    return response