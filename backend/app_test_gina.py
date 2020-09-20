from jina_search.search import Model_jina
model = Model_jina('jina_search/')
parsed_script = [('00:06:31.000', 'Hey everyone. Afternoon. How are you all doing'),
 ('00:06:56.000',
  "I see if new new faces mostly people from last time, but a few new faces. I was thinking that at the end of class, maybe we can do slightly longer Introductions or at least introductions where maybe you say something about a hobby. In addition to your other interests in your major. So, um, so we'll do that again at the end of class. Welcome to neural circuits for cognition, um, any high level questions."),
 ('00:07:26.000',
  "Or Concerns before we start. Good question. Are those lights for this lecture. Good. I'm available before class.")]
question = "new faces introduction"
model.generateIndex(parsed_script, 'test-1')
result = model.search(question, 'test-1')
print(result)
