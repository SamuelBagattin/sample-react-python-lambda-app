import random
import string

from flask import Flask, Response, request
import os
import boto3
import json

dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
table = dynamodb.Table(os.getenv("TODOS_TABLE"))

app = Flask(__name__)


def r(res):
    resp = Response(json.dumps(res))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = '*'
    return resp


@app.route('/', methods=['GET', 'POST', 'OPTIONS'])
def hello_world():
    if request.method == 'POST':
        blob = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))

        data = request.get_json()

        if "name" not in data:
            return r({"error": "body does not contain key 'name'"})

        res = table.put_item(Item={'id': blob, 'name': data["name"]})
        return r(res)

    if request.method == 'GET':
        return r(table.scan()["Items"])

    if request.method == 'OPTIONS':
        return r('ok')
