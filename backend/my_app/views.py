from my_app import app
from flask import render_template, request, redirect, jsonify
from my_app.parse import parse_file
from my_app.search import Model

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
