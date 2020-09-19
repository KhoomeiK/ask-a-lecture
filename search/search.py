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
  def __init__(self, indexDir='whooshIndex', maxResults=5):
    self.indexDir = indexDir

    try:
      self.ix = open_dir(indexDir)
      print('fetching index dir')
    except:
      os.system('rm -rf %s' % indexDir) # reset directory
      os.system('mkdir %s' % indexDir)
      print('please generate index')
      self.ix = None

    self.maxResults = maxResults

    self.nlp = spacy.load('en_core_web_sm')
    self.stopwords = English.Defaults.stop_words.union({'?', 'happen', 'thing'}) # continue adding words to remove

    # self.modelTokenizer = BertTokenizer.from_pretrained('bert-base-uncased') # TODO: make this not take so long or cache
    # self.model = BertForQuestionAnswering.from_pretrained('bert-large-uncased-whole-word-masking-finetuned-squad')
    # logging.getLogger("transformers.tokenization_utils").setLevel(logging.ERROR) # suppress long seq message; logging.WARNING

  def generateIndex(self, chunks): # generates whoosh index directory from files
    schema = Schema(timestamp=TEXT(stored=True), text=TEXT(stored=True, analyzer=StemmingAnalyzer()))
    self.ix = create_in(self.indexDir, schema)
    self.writer = self.ix.writer() # create writer for index

    for chunk in chunks:
      self.writer.add_document(timestamp=chunk[0], text=chunk[1])

    self.writer.commit()

  def search(self, question): # fetches possible result documents for a question
    tokens = self.nlp(question.lower())
    coreTokens = [token.lemma_ for token in tokens if not str(token) in self.stopwords]
    coreStr = ' '.join([word for word in coreTokens])

    resultDocs = []
    with self.ix.searcher() as searcher:
      query = QueryParser('text', self.ix.schema).parse(coreStr)
      results = searcher.search(query)
      for i in range(0, min(len(results), self.maxResults)):
        resultDocs.append(dict(results[i]))
    resultDocs = list({doc['text']:doc for doc in resultDocs}.values())

    # if len(resultDocs) >= 2: # remove similar documents
    #   combs = itertools.combinations(resultDocs, 2)
    #   for a, b in combs:
    #     similarity = difflib.SequenceMatcher(a=a['content'], b=b['content']).ratio()
    #     if similarity > 0.90: # documents more than 90% similar will be removed
    #       try:
    #         poppedInd = max(resultDocs.index(a), resultDocs.index(b)) # remove worse ranked of the two
    #         resultDocs.pop(poppedInd)
    #       except:
    #         pass # document already removed

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
