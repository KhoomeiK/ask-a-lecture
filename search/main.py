from search import Model

model = Model()

examples = [('00:00:12', "At the very end, after we expose some of the basic properties of what this definition is and how it gives us a new viewpoint to think about some of the things we've already talked about. Like what it means for matrix to be in vertical. We're going to talk about a concrete application. So I think, you know, maybe we should really retitle this course, because it's not just linear algebra and optimization somehow"), ('00:00:35', "Our goal is to teach you how to use linear algebra and optimization of think about the world around you. So now that we've built up this repertoire basic linear algebra concepts. It'll be amazing how many different things we can fit under this umbrella through our new understanding So today we're going to explore a key definition and this key definition, it will be abstract at first, but we'll go through some examples.")]

model.generateIndex(examples)

res = model.search('vertical')
print(res)