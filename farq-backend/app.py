import os
from flask import Flask, request, jsonify
import os.path
from flask_cors import CORS, cross_origin
from keras.models import load_model
from keras.preprocessing import image
from keras.applications.inception_v3 import preprocess_input, decode_predictions
import numpy as np

UPLOAD_FOLDER = './static/uploads'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}  # Set the allowed file extensions

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
cors = CORS(app, origins='*')
app.config['CORS_HEADERS'] = 'Content-Type'

model = load_model('./model/final.h5')

img_size = (32, 32)

def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=img_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    #img_array /= 255.0
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        # If the user does not select a file, browser may also submit an empty part without a filename
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        # Check if the file has an allowed extension (adjust as needed)
        allowed_extensions = {'png', 'jpg', 'jpeg'}
        if '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
            return jsonify({'error': 'Invalid file extension'})

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        # Load and preprocess an example image (adjust as needed)
        img_array = preprocess_image(file_path)

        # Make predictions
        predictions = model.predict(img_array)
        print(predictions)
        #predictions = predictions.tolist()


        result = {'FAKE': f'{predictions[0][0]*100:.2f}', 'REAL': f'{predictions[0][1]*100:.2f}'}
        return jsonify(result)


    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=False)
