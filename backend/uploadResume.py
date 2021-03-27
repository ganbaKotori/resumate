import boto3
from secrets import secret_access_key, access_key
import uuid
BUCKET='lbp-resume-builder'


def uploadResume(directory,docxFileName, pdfFileName):
    id = str(uuid.uuid1()) #using UUID to generate a random number to use as the id
    client = boto3.client('s3', aws_access_key_id = access_key, aws_secret_access_key = secret_access_key)
    upload_file_bucket = BUCKET #S3 bucket name
    #file key will be the location where the file is stored in s3
    docx_upload_file_key = 'resumes/' + id + '/' + docxFileName #each location should be unique hence why I use UUID
    pdf_upload_file_key = 'resumes/' + id + '/' + pdfFileName
    #upload the docx and pdf file to s3
    client.upload_file(directory + docxFileName, upload_file_bucket, docx_upload_file_key)
    client.upload_file(directory + pdfFileName, upload_file_bucket, pdf_upload_file_key)
    print('file uploaded successfully')
    #download links to send back to React
    docxDownloadLink = 'https://' + BUCKET + '.s3.amazonaws.com/resumes/' + id + '/' + docxFileName
    pdfDownloadLink = 'https://' + BUCKET + '.s3.amazonaws.com/resumes/' + id + '/' + pdfFileName
    #print('docx url: ' + docxDownloadLink)
    #print('pdf url: ' + pdfDownloadLink)
    return docxDownloadLink, pdfDownloadLink