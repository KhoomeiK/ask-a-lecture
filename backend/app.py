from flask import Flask, session, render_template, request, redirect, jsonify
from flask_cors import CORS
import sqlite3

from my_app.parse import parse_file
from my_app.search import Model

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

model = Model()

@app.route("/api/class", methods=["POST"])
def add_lecture():
    post_info = request.get_json()
    classId = post_info["classId"]
    lectureNumber = post_info["lectureNumber"]
    lectureTitle = post_info["lectureTitle"]
    link = post_info["videoLink"]
    script = post_info["transcript"]

    lectureId = '%s-%s' % (classId, lectureNumber)
    parsed_script = parse_file(script)
    model.generateIndex(parsed_script, lectureId)

    conn = sqlite3.connect('lectures.db')
    c = conn.cursor()
    c.execute('INSERT INTO lectures VALUES (?, ?, ?)', (lectureId, link, lectureTitle))
    conn.commit()
    conn.close()

    return jsonify({"RESPONSE": 200})

@app.route("/api/search", methods=["POST"])
def search():
    post_info = request.get_json()
    classId = post_info["classId"]
    lectureNumber = post_info["lectureNumber"]
    question = post_info["question"]

    lectureId = '%s-%s' % (classId, lectureNumber)
    print(lectureId)
    results = model.search(question, lectureId)
    # results = sorted([x['timestamp'] for x in results]) # todo: get rid of sorted?
    
    conn = sqlite3.connect('lectures.db')
    c = conn.cursor()
    c.execute('SELECT video_link, lecture_title FROM lectures WHERE class_lecture=?', (lectureId,))
    info = c.fetchone()
    conn.close()

    if info == None:
      return jsonify({"RESPONSE": "lecture has not been indexed"})
    else:
      if 'youtube' in info[0]:
        link = 'https://youtu.be/%s' % info[0].split('=')[1]
      else:
        link = info[0]

      return jsonify({'link': link, 'title': info[1], 'results': results})

@app.route("/api/list_lectures", methods=["GET"])
def list_lectures():
    conn = sqlite3.connect('lectures.db')
    c = conn.cursor()
    c.execute('SELECT class_lecture FROM lectures')
    lecs = c.fetchall()
    conn.close()

    lecs = [x[0] for x in lecs]

    return jsonify({'lectures': lecs})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

'''
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"classId":"ctest01","lectureTitle":"Intro to testing", "videoLink": "youtube.com/memeloltest1", "lectureNumber": "01", "transcript": "00:12\nAt the very end, after we expose some of the basic properties of what this definition is and how it gives us a new viewpoint to think about some of the things weve already talked about.\n00:22\nLike what it means for matrix to be in vertical. Were going to talk about a concrete application."}' \
  http://localhost:5000/api/class

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"classId":"ctest01","lectureNumber": "01", "question": "vertical"}' \
  http://localhost:5000/api/search
'''