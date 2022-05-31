from flask import Flask, jsonify, render_template, request, url_for, flash, redirect
import ssl, codecs, sys, json, os
sys.path.append('./classes')


app = Flask(__name__, template_folder='static/html')
app.config['SECRET_KEY'] = '21cb588d69eae6e170f4eb9c914601d2'

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/tbd')
def tbd():
    return render_template('tbd.html')

if __name__ == '__main__':
    port = int(os.environ.get('FLASK_PORT')) or 8080

    app.run(port=port,host='0.0.0.0')