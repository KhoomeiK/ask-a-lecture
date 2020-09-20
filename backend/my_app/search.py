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

# from transformers import BertTokenizer, BertForQuestionAnswering
# import torch
# import logging

class Model:
  def __init__(self, indicesDir='whooshIndices', maxResults=5):
    self.indicesDir = indicesDir
    self.maxResults = maxResults
    self.nlp = spacy.load('en_core_web_sm')
    self.stopwords = English.Defaults.stop_words.union({'?', 'happen', 'thing'}) # continue adding words to remove

    # self.modelTokenizer = BertTokenizer.from_pretrained('bert-base-uncased') # TODO: make this not take so long or cache
    # self.model = BertForQuestionAnswering.from_pretrained('bert-large-uncased-whole-word-masking-finetuned-squad')
    # logging.getLogger("transformers.tokenization_utils").setLevel(logging.ERROR) # suppress long seq message; logging.WARNING

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

  # def answer(self, question):
  #   documents = self.search(question)

  #   answers = set()
  #   for document in documents:
  #       # print("----------DOCUMENT %s:" % document['title'])
  #       # print(document['content']) # return docs for flask?
        
  #       input_dict = self.modelTokenizer.encode_plus(question, document['content'], return_tensors='pt')

  #       if len(input_dict['input_ids'][0]) > 512:
  #         continue

  #       start_scores, end_scores = self.model(**input_dict)
  #       start, end = torch.argmax(start_scores).item(), torch.argmax(end_scores).item() + 1
        
  #       all_tokens = self.modelTokenizer.convert_ids_to_tokens(input_dict['input_ids'].squeeze(0).tolist())
  #       all_tokens = [x.replace('▁', '') for x in all_tokens]
  #       answer = all_tokens[start : end]

  #       answers.add((' '.join(answer), document['path']))

  #   return list(answers) # TODO: return best answer (take avg as confidence?)
