from flask import Flask, Response

app = Flask(__name__)


@app.route('/')
def hello_world():
    resp = Response("Foo bar baz")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp
