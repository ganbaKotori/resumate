# Resumate
## Developed by LBP for LA Hacks 2021
- Alexander Ramirez
- David Garza
- Luis Rodriguez

# how to start backend

``` 
cd backend

pip install flask 
pip install -U flask-cors 
pip install boto3
pip install bs4
pip install requests
pip install docx2pdf

export FLASK_APP=server.py
export FLASK_ENV=development
flask run 
```

Now you can do a POST request to http://localhost:5000/generate-resume

You can use Postman to do that request

There's an example of doing a POST request on Discord

# how to start backend

```
cd frontend

npm install

npm start
```
Navigate to http://localhost:3000/landing
