from flask import Flask, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

information = {
    "hello": "hey",
    "clicks": 0,
}

@app.route("/")
def hello_world():
    information["clicks"]+=1
    response = app.response_class(response=json.dumps(information), status=200, mimetype='application/json')
    return response