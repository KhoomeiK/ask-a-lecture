import os
import re

from whoosh.index import create_in, open_dir
from whoosh.fields import *
from whoosh.qparser import QueryParser
from whoosh.analysis import StemmingAnalyzer

import spacy
from spacy.lang.en import English
import difflib
import itertools

class Model:
  def __init__(self, indicesDir='whooshIndices', maxResults=5):
    self.indicesDir = indicesDir
    self.maxResults = maxResults
    self.nlp = spacy.load('en_core_web_sm')
    self.stopwords = English.Defaults.stop_words.union({'?', 'happen', 'thing'}) 
    
  def generateIndex(self, chunks, lectureDir): # generates whoosh lectureDir from parsed chunks
    schema = Schema(timestamp=TEXT(stored=True), text=TEXT(stored=True, analyzer=StemmingAnalyzer()))
    
    os.system('mkdir ./%s/%s' % (self.indicesDir, lectureDir))
    ix = create_in('./%s/%s' % (self.indicesDir, lectureDir), schema)
    writer = ix.writer() # create writer for index

    for chunk in chunks:
      writer.add_document(timestamp=chunk[0], text=chunk[1])

    writer.commit()
    return 200

  def search(self, question, lectureDir): # fetches possible result answers for a question in lectureDir
    try:
      ix = open_dir('./%s/%s' % (self.indicesDir, lectureDir))
    except:
      print('Error: lecture has not been indexed')
      return 404

    tokens = self.nlp(question.lower())
    coreTokens = [token.lemma_ for token in tokens if not str(token) in self.stopwords]
    coreStr = ' '.join([word for word in coreTokens])

    resultDocs = []
    with ix.searcher() as searcher:
      query = QueryParser('text', ix.schema).parse(coreStr)
      results = searcher.search(query)
      for i in range(0, min(len(results), self.maxResults)):
        resultDocs.append(dict(results[i]))

    return resultDocs
