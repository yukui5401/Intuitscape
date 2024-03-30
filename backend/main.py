from flask import Flask, request, jsonify 
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_vertexai import ChatVertexAI
from langchain_core.output_parsers import StrOutputParser
import vertexai
import json
import os

load_dotenv()

project = os.getenv("PROJECT_NAME")
location = 'northamerica-northeast1'
vertexai.init(project=project, location=location)
system = "You are an expert at a broad range of topics. Your job is to help humans learn about new topics."

app = Flask(__name__)

@app.route("/create_subtopics", methods = ['POST'])
def create_subtopics():
  request_data = request.get_json()
  topic = request_data['topic']

  human = "Create a list of 15 subtopics that someone interested in learning about {topic} should learn. These subtopics will be used as titles for slides on a slideshow, so keep them brief. Do not elaborate. You must respond through a json format. The name of the only key in the json object should be 'subtopics' and the value should be a single list with 15 elements. Do not include markdown formatting in your response."
  prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

  llm = ChatVertexAI(model_name="gemini-pro", convert_system_message_to_human=True)

  output_parser = StrOutputParser()

  chain = prompt | llm | output_parser

  results = chain.invoke({"topic" : topic})

  print(results)

  if (results[:7] == "```json"):
    results = results[7:-4]
  elif (results[:3] == "```"):
    results = results[3:-4]
  elif (results[:7] == "```JSON"):
    results = results[7:-4]
  
  return json.loads(results)

@app.route("/create_presentation", methods = ['POST'])
def create_presentation():
  request_data = request.get_json()
  topic = request_data['topic']
  education = request_data['education_level']
  detail = request_data['detail']
  subtopics = request_data['subtopics']

  generated_content = {"content": []}

  for subtopic in subtopics:
    human = "Generate a paragraph explaining to someone at the {education} level in {detail} detail about {subtopic}. It is part of a presentation on {topic}. Limit your response to 200 words. Respond in plain text. Do not include any markdown formatting. Do not include a title, simply generate an explanation."
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

    llm = ChatVertexAI(model_name="gemini-pro", convert_system_message_to_human=True)

    output_parser = StrOutputParser()
    
    chain = prompt | llm | output_parser
    
    try:
      results = chain.invoke({"topic" : topic, "subtopic": subtopic, "detail" : detail, "education": education})
    except:
      print("----------------------------------------------------------------------------------------------------------")
      print("--------------------------------------------RATE LIMIT REACHED--------------------------------------------")
      print("----------------------------------------------------------------------------------------------------------")

    generated_content["content"].append({"title" : subtopic, "explanation": results})
  
  return jsonify(generated_content)


if __name__ == "__main__":
    app.run(debug=True)

