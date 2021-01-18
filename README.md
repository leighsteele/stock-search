# Stock Exchange Search Web App

## Description

A multipage web application that allows users to search NASDAQ stock exchange companies by symbol, see a more detailed company profile and view and delete their search history. The app was built using HTML5, CSS3, Bootstrap, Vanilla JavaScript, Chart.js, REST API, Node.js, Express and MongoDB. This project makes use of Object Oriented Programming by way of JavaScript classes.

This project is based on the Financial Modeling Prep API. You can find all the endpoints and the official documentation here: [Financial Modeling Prep API Documentation](https://financialmodelingprep.com/developer/docs/).

Important: An API key is required on every request and is available for free on signup at Financial Modeling Prep's website. Make sure to include the API key in the .env file.

## Installation
- Clone the repo in your terminal by clicking the _green_ Code button at the top right and copying the url
- In your terminal, type ```git clone URL```, replacing URL with the url you copied
- This will copy all the files from this repository to your computer
- In your terminal, cd into the directory you just created
- Then cd into the server directory
- Type ```npm install``` to install all dependencies
- Add the required environment variables to the .env file and save the file
- Last, but not least, type ```node index.js``` to run the server locally
- To view the app in the browser, open the code in VSCode editor and right click on index.html, then select "Open with Live Server"

Required environment variables:

```
BASE_URL='https://financialmodelingprep.com/api/v3'
API_KEY=''
```
