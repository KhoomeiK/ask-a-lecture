from my_app import app

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

'''
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"classId":"ctest01","lectureTitle":"Intro to testing", "lectureNumber": "01", "transcript": "00:12\nAt the very end, after we expose some of the basic properties of what this definition is and how it gives us a new viewpoint to think about some of the things weve already talked about.\n00:22\nLike what it means for matrix to be in vertical. Were going to talk about a concrete application."}' \
  http://localhost:5000/api/class

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"classId":"ctest01","lectureNumber": "01", "question": "vertical"}' \
  http://localhost:5000/api/search
 '''