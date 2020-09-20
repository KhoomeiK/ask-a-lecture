cd backend
pip3 install spacy whoosh flask flask_cors
python3 -m spacy download en_core_web_sm
python3 app.py &
cd ../frontend
npm i
npm start
