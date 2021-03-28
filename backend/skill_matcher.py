import requests
from bs4 import BeautifulSoup as bs

url = 'https://www.linkedin.com/jobs/view/2442922626/?eBP=NotAvailableFromMidTier&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=6uFwmmDAwclD46luXJB1Uw%3D%3D&trackingId=uz6y3Dr%2FHJAatiKQEUQYuA%3D%3D&trk=flagship3_search_srp_jobs'

def retrieve_job_qualifications(URL) :
    '''Function that takes in a webpage and retrieves the html via beautiful soup'''
    webpage = requests.get(URL)
    soup = bs(webpage.content, 'html.parser')

    return soup

def compare_skills(soup, skills) :
    '''Function that checks whether or not the user has the skills the job requires'''
    matched_skills = []

    for skill in skills :
        if skill.lower() in soup.text.lower() :
            matched_skills.append(skill)

    if len(matched_skills) == 0 :
        print('You do not meet the qualifications for this job')
    else :
        print('These skills match the jobs qualifications: ')
        for skill in matched_skills :
            print('- ' + skill)