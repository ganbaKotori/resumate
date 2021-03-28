from uploadResume import uploadResume
from skill_matcher import retrieve_job_qualifications, compare_skills

from flask import Flask, request, jsonify
from flask_cors import CORS

from docx2pdf import convert

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
    print("end of user input")


    #skills requirement by the job
    jobQualifications = retrieve_job_qualifications(url) 
    #skills that match up the requirememnts
    qualifiedSkill = compare_skills(jobQualifications, skills)

    print(qualifiedSkill)

    convert("./resumes/resume.docx", "./resumes/resume.pdf")

    docxDownloadLink , pdfDownloadLink = uploadResume('./resumes/','resume.docx','resume.pdf')
    #return docxDownloadLink, pdfDownloadLink
    return jsonify(docxDownloadLink=docxDownloadLink, pdfDownloadLink=pdfDownloadLink)
  if request.method == 'GET':
    return "This is the generate-resume GET route. If you want to generate a resume, you need to use the generate-resume POST route"

  
  
