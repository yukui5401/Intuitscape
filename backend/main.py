from flask import Flask, request, jsonify 
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_vertexai import ChatVertexAI
from langchain_core.output_parsers import StrOutputParser
import vertexai
import json
import os

load_dotenv()

project="genai-genesis-418815"
location = 'northamerica-northeast1'
vertexai.init(project=project, location=location)
system = "You are an intelligent assistant who is an expert at a broad range of topics. Your job is to help humans learn about new topics. You only provide responses in a json format"

app = Flask(__name__)

@app.route("/create_subtopics", methods = ['POST'])
def create_subtopics():
  request_data = request.get_json()
  topic = request_data['topic']

  human = "Create a list of 15 subtopics from the topic of {topic}. The name of the key should be 'subtopics' and the value should be a single list with 15 elements"
  prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

  llm = ChatVertexAI(model_name="gemini-pro", convert_system_message_to_human=True)

  output_parser = StrOutputParser()

  chain = prompt | llm | output_parser

  results = chain.invoke({"topic" : topic})

  print(results)

  if (results[:7] == "```json"):
    results = results[7:-4]
  
  return json.loads(results)

@app.route("/generate_topics")
def generate_topics():
   return "hello world"


if __name__ == "__main__":
    app.run(debug=True)

