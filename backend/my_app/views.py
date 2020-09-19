# Views at the end of Workshop 2
from my_app import app
from flask import render_template, request, redirect, jsonify
from my_app.parse import parse_file

@app.route("/")
def hi():
    return "hello world"

@app.route("/api/class", methods=["POST"])
def add_lecture():
    if request.method == "POST":
        print(request)
        post_info = request.get_json()
        classId = post_info.get("classId")
        lectureTitle = post_info.get("lectureTitle")
        lectureNumber = post_info.get("lectureNumber")
        script = post_info.get("transcript")
        link = post_info.get("videoLink")
        parsed_script = parse_file(script)
        print(lectureTitle)
    return jsonify({"response": "added lecture"})

@app.route("/api/search", methods=["GET"])
def search():
    if request.method == "GET":
        print(request)
        post_info = request.get_json()
        classId = post_info.get("classId")
        lectureNumber = post_info.get("lectureNumber")
        question = post_info.get("question")
        timeStamps = []
    return jsonify(timeStamps)
