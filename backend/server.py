from uploadResume import uploadResume

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def printMessage():
  return "resumate flask server"


@app.route("/generate-resume", methods = ['GET', 'POST'])
def generateResume():
  if request.method == 'POST':
    data = request.get_json()

    url = data['userInformation']['url']
    firstName = data['userInformation']['firstName']
    lastName = data['userInformation']['lastName']
    email = data['userInformation']['email']
    phoneNumber = data['userInformation']['phoneNumber']
    education = data['userInformation']['education']
    experience = data['userInformation']['experience']
    skills = data['userInformation']['skills']

    print(url)
    print(firstName) 
    print(lastName) 
    print(email)
    print(phoneNumber)
    print(education)
    print(experience)
    print(skills)

    docxDownloadLink , pdfDownloadLink = uploadResume('./resumes/','resume.docx','resume.pdf')
    #return docxDownloadLink, pdfDownloadLink
    return jsonify(docxDownloadLink=docxDownloadLink, pdfDownloadLink=pdfDownloadLink)
  if request.method == 'GET':
    return "This is the generate-resume GET route. If you want to generate a resume, you need to use the generate-resume POST route"

  
  
