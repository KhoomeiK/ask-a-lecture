# Views at the end of Workshop 2
from backend import app
from flask import render_template, request, redirect
from backend.parse import parse_file

@app.route("/api/class", methods=["POST"])
def add_lecture():
    if request.method == "POST":
        print(request)
        post_info = request.get_json()
        lectureId = post_info.get("lectureNumber")
        lectureTitle = post_info.get("lectureTitle")
        script = post_info.get("transcript")
        link = post_info.get("videoLink")
        parsed_script = parse_file(script)
    return redirect("/")

@app.route("/api/search", methods=["POST"])
def search():
    if request.method == "POST":
        print(request)
        post_info = request.get_json()
        lectureId = post_info.get("lectureNumber")
        question = post_info.get("question")
    return redirect("/")
