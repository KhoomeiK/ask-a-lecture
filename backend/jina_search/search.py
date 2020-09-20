import os
from jina.flow import Flow
class Model_jina:
    def __init__(self, jina_dir='', maxResults=5):
        self.maxResults = maxResults
        self.query_results = None
        self.dir = jina_dir

    def config(self, data_file, workspace):
        os.environ["JINA_DATA_FILE"] = os.environ.get(
            "JINA_DATA_FILE", self.dir + data_file
        )
        os.environ["JINA_WORKSPACE"] = os.environ.get("JINA_WORKSPACE", self.dir + workspace)

        os.environ["JINA_PORT"] = os.environ.get("JINA_PORT", str(45678))

    def get_topk(self, resp, sentence):
        results = []
        for d in resp.search.docs:
            for idx, match in enumerate(d.matches):
                score = match.score.value
                if score < 0.0:
                    continue
                timestamp = match.meta_info.decode()
                text = match.text.strip()
                print(timestamp, text)
                results.append((timestamp, text))
        self.query_results = results

    def index(self, num_docs):
        f = Flow().load_config(self.dir + "flow-index.yml")

        with f:
            f.index_lines(
                filepath=os.environ["JINA_DATA_FILE"],
                batch_size=8,
                size=num_docs,
            )

    def query(self, text, top_k):
        f = Flow().load_config(self.dir + "flow-query.yml")
        with f:
            def ppr(x):
                return self.get_topk(x, text)
            f.search_lines(lines=[text, ], output_fn=ppr, top_k=top_k)

    def save_csv(self, sents, file):
        with open(file, 'w') as f:
            for tup in sents:
                f.write(tup[0] + '[SEP]' + tup[1])
                f.write("\n")

    def generateIndex(self, parsed_script, lectureId):
        workspace = "workspaces/" + lectureId
        # workspace = self.dir + "workspaces/" + lectureId
        data_file = "data/" + lectureId + '.csv'
        self.save_csv(parsed_script, self.dir + data_file)
        self.config(data_file, workspace)
        self.index(len(parsed_script))

    def search(self, question, lectureId): # fetches possible result answers for a question in lectureDir
        workspace = "workspaces/" + lectureId
        data_file = "data/" + lectureId + '.csv'
        self.config(data_file, workspace)
        self.query(question, self.maxResults)
        return self.query_results
