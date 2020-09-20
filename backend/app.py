from flask import Flask, session, render_template, request, redirect, jsonify
from flask_cors import CORS

from my_app.parse import parse_file
from my_app.search import Model

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

model = Model()

@app.route("/api/class", methods=["POST"])
def add_lecture():
    post_info = request.get_json()
    classId = post_info["classId"]
    lectureTitle = post_info["lectureTitle"]
    lectureNumber = post_info["lectureNumber"]
    script = post_info["transcript"]
    link = post_info["videoLink"]

    parsed_script = parse_file(script)
    model.generateIndex(parsed_script, '%s-%s' % (classId, lectureNumber))

    return jsonify({"response": "added lecture"})

@app.route("/api/search", methods=["POST"])
def search():
    post_info = request.get_json()
    classId = post_info["classId"]
    lectureNumber = post_info["lectureNumber"]
    question = post_info["question"]

    results = model.search(question, '%s-%s' % (classId, lectureNumber))
    # results = sorted([x['timestamp'] for x in results]) # todo: get rid of sorted?
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
