#set up do flask
from flask import Flask
from flask import request
import json
app = Flask(__name__)

import ControlaModelo
controlador_modelo_intent = ControlaModelo.ControladorIntent()
controlador_modelo_entity = ControlaModelo.ControladorEntity()


@app.route("/")
def hello_world():
    return "<p>Esse é o backend do ASSIS - Assistente de Anotação!</p>"



@app.route("/treinamento_intent")
def treinamento_intent():
    return """<form action="./treina_intent" method="post">
    
    <p>Sentenças</p>
    <input type="text" name="sentences[0]" value='{\"anotacao_intencao\": {\"[agradecimento]\": 0,  \"[consulta_saldo]\": 1,  \"[cumprimento]\": 1,  \"[despedida]\": 0,  \"[info_cpf]\": 0,  \"[info_placa]\": 0,  \"[info_valor]\": 0,  \"[negacao]\": 0,  \"[req_ajuda]\": 0,  \"[req_cpf]\": 0,  \"[req_mais]\": 0,  \"[req_placa]\": 0}, \"sentence\": \"boa tarde, me informe o meu mim saldo por favor.\"}'><br>
    <input type="text" name="sentences[1]" value='{\"anotacao_intencao\": {\"[agradecimento]\": 0,  \"[consulta_saldo]\": 0,  \"[cumprimento]\": 1,  \"[despedida]\": 0,  \"[info_cpf]\": 0,  \"[info_placa]\": 0,  \"[info_valor]\": 0,  \"[negacao]\": 0,  \"[req_ajuda]\": 0,  \"[req_cpf]\": 1,  \"[req_mais]\": 0,  \"[req_placa]\": 1}, \"sentence\": \"olá, boa tarde. preciso que me informe primeiro sua placa e o seu cpf.\"}'><br>
    <input type="text" name="sentences[2]" value='{\"sentence\": \"placa: dtec WPI-6789 e cpf: 20836111552\", \"anotacao_intencao\": {\"[cumprimento]\": 0, \"[req_placa]\": 0, \"[req_cpf]\": 0, \"[info_valor]\": 0, \"[req_mais]\": 0, \"[agradecimento]\": 0, \"[despedida]\": 0, \"[req_ajuda]\": 0, \"[consulta_saldo]\": 1, \"[info_placa]\": 1, \"[info_cpf]\": 1, \"[negacao]\": 0}}'><br>
    <input type="text" name="sentences[3]" value='{\"sentence\": \"seu saldo atual é de R$889,48. precisa de algo mais?\", \"anotacao_intencao\": {\"[cumprimento]\": 0, \"[req_placa]\": 0, \"[req_cpf]\": 0, \"[info_valor]\": 1, \"[req_mais]\": 1, \"[agradecimento]\": 0, \"[despedida]\": 0, \"[req_ajuda]\": 0, \"[consulta_saldo]\": 0, \"[info_placa]\": 0, \"[info_cpf]\": 0, \"[negacao]\": 0}}'><br>
    <input type="text" name="sentences[4]" value='{\"sentence\": \"sim, pode consultar para a placa qmj2u34 também?\", \"anotacao_intencao\": {\"[cumprimento]\": 0, \"[req_placa]\": 0, \"[req_cpf]\": 0, \"[info_valor]\": 0, \"[req_mais]\": 0, \"[agradecimento]\": 0, \"[despedida]\": 0, \"[req_ajuda]\": 0, \"[consulta_saldo]\": 1, \"[info_placa]\": 1, \"[info_cpf]\": 0, \"[negacao]\": 0}}'><br>
    
    <input type="submit" value="Submit">
    </form>
    """


@app.route("/intent")
def intent():
    return """<form action="./anota_intent" method="post">
    <input type="text" id="sentence" name="sentence"
    value="Oi, gostaria de saber o meu saldo."><br>
    <input type="submit" value="Submit">
    </form>
    """

#value='{\"sentence\": \"oi gostaria de saber meu saldo\", \"anotacao_intencao\": {\"[cumprimento]\": 1, \"[req_placa]\": 0, \"[req_cpf]\": 0, \"[info_valor]\": 0, \"[req_mais]\": 0, \"[agradecimento]\": 0, \"[despedida]\": 0, \"[req_ajuda]\": 0, \"[consulta_saldo]\": 1, \"[info_placa]\": 0, \"[info_cpf]\": 0, \"[negacao]\": 0}}'><br>
    

@app.route("/treina_intent", methods=['POST', 'GET'])
def treina_intent():
    error = None
    if request.method == 'POST':
        val = request.form

        for key in val.keys():
            
            inp = json.loads(val[key])
            controlador_modelo_intent.treina(inp)

        return json.dumps({"status": "Model trained with {} inputs".format(len(val.keys()))})
    return json.dumps({"status": "Missing parameters"})


@app.route('/anota_intent', methods=['POST', 'GET'])
def anota_intent():
    error = None
    if request.method == 'POST':
        val = request.form['sentence']
        anotacao = controlador_modelo_intent.classifica(val)
        return str(anotacao) 
    return "NADA"



#########################################################################################################################
#                                         ANOTAÇÃO ENTIDADES



@app.route("/treinamento_entity")
def treinamento_entity():
    return """<form action="./treina_entity" method="post">
    
    <p>Sentenças</p>
    <input type="text" name="sentences[0]" value='[["placa:", "dtec", "WPI-6789", "e", "cpf:", "20836111552"], ["O", "O", "B-placa", "O", "O", "B-cpf"]]'><br>
    <input type="text" name="sentences[1]" value='[["seu", "saldo", "atual", "é", "de", "R$889,48.", "precisa", "de", "algo",  "mais?"], ["O", "O", "O", "O", "O", "B-valor", "O", "O", "O", "O"]]'><br>
    <input type="text" name="sentences[2]" value='[["sim,", "pode", "consultar", "para", "a", "placa", "qmj2u34", "também?"], ["O", "O", "O", "O", "O", "O", "B-placa", "O"]]'><br>
    <input type="text" name="sentences[3]" value='[["claro,", "o", "saldo", "para", "essa", "placa", "é", "de", "R$497,04.", "precisa", "de", "algo", "mais?"], ["O", "O", "O", "O", "O", "O", "O", "O", "B-valor", "O", "O", "O", "O"]]'><br>
    <input type="text" name="sentences[4]" value='[["Olá,", "tenho", "que", "saber", "meu", "saldo", "n", "a", "placa", "XBI3L36."], ["O", "O", "O", "O", "O", "O", "O", "O", "O", "B-placa"]]'><br>
    
    <input type="submit" value="Submit">
    </form>
    """


@app.route("/entity")
def entity():
    return """<form action="./anota_entity" method="post">
    <input type="text" id="sentence" name="sentence"
    value="Oi, seu saldo é de 50 reais"><br>
    <input type="submit" value="Submit">
    </form>
    """

#value='{\"sentence\": \"oi gostaria de saber meu saldo\", \"anotacao_intencao\": {\"[cumprimento]\": 1, \"[req_placa]\": 0, \"[req_cpf]\": 0, \"[info_valor]\": 0, \"[req_mais]\": 0, \"[agradecimento]\": 0, \"[despedida]\": 0, \"[req_ajuda]\": 0, \"[consulta_saldo]\": 1, \"[info_placa]\": 0, \"[info_cpf]\": 0, \"[negacao]\": 0}}'><br>
    

@app.route("/treina_entity", methods=['POST', 'GET'])
def treina_entity():
    error = None
    if request.method == 'POST':
        val = request.form
        for key in val.keys():
            inp = json.loads(val[key])
            inp = inp[0], inp[1]
            controlador_modelo_entity.treina(inp)
            #except:
            #    print('NÃO FOI')
 
        return json.dumps({"status": "Model trained with {} inputs".format(len(val.keys()))})
    return json.dumps({"status": "Missing parameters"})


@app.route('/anota_entity', methods=['POST', 'GET'])
def anota_entity():
    error = None
    if request.method == 'POST':
        val = request.form['sentence']
        anotacao = controlador_modelo_entity.classifica(val)
        return str(anotacao) 
    return "NADA"


