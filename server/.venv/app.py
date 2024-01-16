from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

data = [{
    "account1": {
        "name": 'Luka',
        "lastname": 'Tskhvaradze',
        "age": 17,
        "email": "lcxvaradzee400@gmail.com"
    }
}]

@app.route('/accounts')
def accounts():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
