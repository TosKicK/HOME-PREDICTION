from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from server import util
import os

app = Flask(__name__)
CORS(app)


# Serve frontend
@app.route('/')
def home():
    return send_file(os.path.join(os.getcwd(), 'client', 'app.html'))


@app.route('/get_location_names')
def get_location_names():
    return jsonify({
        'locations': util.get_location_names()
    })


@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    try:
        data = request.get_json()

        total_sqft = float(data['total_sqft'])
        location = data['location']
        bhk = int(data['bhk'])
        bath = int(data['bath'])

        estimated_price = util.get_estimated_price(
            location, total_sqft, bhk, bath)

        return jsonify({
            'estimated_price': estimated_price
        })

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(host='0.0.0.0', port=10000)
