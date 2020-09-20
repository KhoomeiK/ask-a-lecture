__copyright__ = "Copyright (c) 2020 Jina AI Limited. All rights reserved."
__license__ = "Apache-2.0"

import os

import click
from jina.flow import Flow

import json

results_global = []

def config():
    os.environ["JINA_DATA_FILE"] = os.environ.get(
        "JINA_DATA_FILE", "data/test_size_3.csv"
    )
    os.environ["JINA_WORKSPACE"] = os.environ.get("JINA_WORKSPACE", "workspace_test_default")

    os.environ["JINA_PORT"] = os.environ.get("JINA_PORT", str(45678))


def print_topk(resp, sentence):
    global results_global
    for d in resp.search.docs:
        print(f"Ta-Dah🔮, here are what we found for: {sentence}")
        results = {}
        characters = []
        dialogs = []
        for idx, match in enumerate(d.matches):
            score = match.score.value
            if score < 0.0:
                continue
            character = match.meta_info.decode()
            dialog = match.text.strip()
            results[character] = dialog
            # print(f'> {idx:>2d}({score:.2f}). {character.upper()} said, "{dialog}"')

        # print(json.dumps(results, sort_keys=True))
        results_global.append(str(sorted(list(results.keys()))))
        print(sorted(list(results.keys())))


def index(num_docs):
    f = Flow().load_config("flow-index.yml")

    with f:
        f.index_lines(
            filepath=os.environ["JINA_DATA_FILE"],
            batch_size=8,
            size=num_docs,
        )


def query(top_k, sents=None):
    f = Flow().load_config("flow-query.yml")
    with f:
        if sents:
            for text in sents:
                def ppr(x):
                    print_topk(x, text)
                f.search_lines(lines=[text, ], output_fn=ppr, top_k=top_k)
        else:
            while True:
                text = input("please type a sentence: ")
                if not text:
                    break

                def ppr(x):
                    print_topk(x, text)
                f.search_lines(lines=[text, ], output_fn=ppr, top_k=top_k)


def query_restful():
    f = Flow().load_config("flow-query.yml")
    f.use_rest_gateway()
    with f:
        f.block()


def dryrun():
    f = Flow().load_config("flow-index.yml")
    with f:
        f.dry_run()


@click.command()
@click.option(
    "--task",
    "-t",
    type=click.Choice(
        ["index", "query", "query_restful", "dryrun", "query_default"], case_sensitive=False
    ),
)

@click.option("--num_docs", "-n", default=400)
@click.option("--top_k", "-k", default=5)
def main(task, num_docs, top_k):
    config()
    if task == "index":
        index(num_docs)
    if task == "query":
        query(top_k)
    if task == "query_restful":
        query_restful()
    if task == "dryrun":
        dryrun()
    if task == "query_default":
        questions = ["vector space",
                    "null space",
                    "euclidean plane",
                    "subspace",
                    "sub space",
                    "basis vectors",
                    "what is a vector space?",
                    "what is a null space?",
                    "what are the properties of a vector space?",
                    "what are examples of subspaces?"]
        query(top_k, questions)
        for i in results_global:
            print(i)



if __name__ == "__main__":
    main()
