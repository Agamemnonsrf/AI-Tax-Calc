# AI-Tax-Calc

![header image](https://github.com/Agamemnonsrf/AI-Tax-Calc/blob/main/readme-static/aitaxcalc-headerimg.png?raw=true)

## Table of Contents
1. [Introduction](#introduction)
2. [Implementation](#implementation)
3. [How to Run](#how-to-run)

## Introduction
This project is a full stack app intended to provide the user with an easy to use platform with simple tools for calculating taxes for salaried individuals and business owners, and also for receiving tax advice.

## Implementation
This section outlines the tech stack used to build the project and provides a descriptive overview of how each aspect of it was implemented.


#### Table of Contents
1. [Frontend](#frontend)
2. [Backend](#backend)
3. [Database](#database)
4. [OpenAI API](#openai-api)
5. [Containerization](#containerization)
6. [Continuous Integration](#continuous-integration)

## Frontend
### Dev Server, Framework and Language:
- Vite 
- React
- Typescript

### Important Packages:
- React Router (navigation)
- Jest (tests)
- TailwindCSS (styling & responsive)

### Analysis:
The Frontend is a website consisting of 4 routes which provide the following functionalities (the routing system is provided by the React Router package):
1. Welcome Page
    - The Welcome Page features a welcoming label that describes the website and two buttons that navigate the user to either the Tax Advisor or the Tax Calculation Tool. There is also a global header at the top of the page which lets the user see their sign in status and access the Sign In & Sign Up Page, or sign out. The header also provides a logo of the website which when clicked, will redirect the user back to the Welcome Page.

2. Tax Advisor Page
    - The Tax Advisor Page lets the user communicate with the Tax Advisor in a chatbot interface. 
    - The user can create multiple separate sessions to have independent discussions with the Tax Advisor and delete them. 
    - The sessions will only be saved if the user is not a guest (is signed in with their account), otherwise they will be lost after a page refresh. 
    - Some sample questions relating to tax management are provided to the user to help start the conversation. 
    - The Tax Advisor requires an OpenAI key in the .env file to be able to respond, otherwise only a mock response will be given. 
    - The interface provides error messages in case of communication failure with the Backend or the OpenAI API.

3. Tax Calculation Tool Page
    - The Tax Calculation Tool features two separate forms, one for salaried individuals and for business owners respectively. 
    - The user is able to enter their income, expenses, tax rate, etc. 
    - After the user submits the information, it is sent to the Backend for calculation. 
    - At the end, a pie chart is shown to detail the expected taxed amount based on what was calculated in the Backend.

4. Sign In & Sign Up Page
    - The user is able to access the Sign In & Sign Up page through the header at the top of the screen. 
    - The user may enter the page to either create an account or sign in with an existing one. 
    - After the user has provided the information needed to perform the desired action for their account, they are redirected to the home page and are now signed in. 
    - A signed in user is able to save their Tax Advisor sessions and messages in the MySQL database. 
    - Empty sessions are not saved. 
    - The user may sign out by clicking the Sign Out button on the header. 
    - The app saves a Backend-generated JWT token in the browser's local storage which is used to authenticate the user. 
    - The token expires in one hour and after this time has passed, the user will be automatically logged out.

Additionally, each page is styled and made responsive to varying screen sizes using TailwindCSS.


## Backend
### Runtime, Framework and Language:
- NodeJS 
- ExpressJS
- Typescript

### Important Packages:
- OpenAI (chatbot)
- Jest (tests)
- Dotenv (secrets)
- MySQL2 (database)

### Analysis:
The Backend exposes a RESTful API to serve as a bridge layer between the Frontend and the database.

- It establishes the initial connection to the database.
- Creates the required MySQL tables needed for all the data to store and process during the app's use.
- Queries the database using MySQL syntax.
- Hands out and decodes JWT tokens for user authentication.
- Calculates the user's tax form data.
- Makes requests to the OpenAI API for the Tax Advisor. 

All the sensitive data it needs like secret DB and API keys are passed to it during runtime with a .env file. If there is no DB key in the .env, the app is not able to create or sign in users. If there is no OpenAI API key, the app responds to user messages in the Tax Advisor Page with mock responses.

### .env File Clarification
```
OPENAI_API_KEY= 
#Used to communicate with the OpenAI Chat Completions API. If missing, a mock Tax Advisor will respond to the user

DB_SECRET_KEY= 
#Required for authentication, used for encrypting and verifying the JWT for authentication, could be any string, but the longer and more complex, the more secure. If it is not present, no accounts will be able to be made

DB_HOST= 
#Required, used to specify the address of the mysql container. Should be "mysql" if you intend to run using docker compose, or "localhost" if you intend to start the development server

DB_PORT= 
#Required, used to define the port of the mysql container's address, default mysql port is 3306

DB_USER= 
#Required, used to specify the username of the root user to make operations with in the database

DB_PASS=
#Required, used to specify the password of the root user to make operations with in the database

DB_NAME=
#Required, used to specify the name of the main database that the root user will make operations in
```


## Database
### Analysis:
Database running in a mysql:8 docker image.

The Backend creates 3 tables on initialization using SQL Syntax
1. Users Table
```
CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (username)
        )
```
This table contains all the created users. Passwords are encrypted with the bcrypt package on the backend before being stored here.


2. Chat Sessions Tables
```
CREATE TABLE IF NOT EXISTS chat_sessions (
            u_id VARCHAR(255) PRIMARY KEY,
            id INT,
            user_id INT NOT NULL,
            session_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
```
All the Tax Advisor chat sessions for each user are created or deleted in this table.


3. Chat Messages Table
```
CREATE TABLE IF NOT EXISTS chat_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            session_id VARCHAR(255) NOT NULL,
            msg_index INT NOT NULL,
            user_id INT NOT NULL,
            sender VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (session_id) REFERENCES chat_sessions(u_id)
        )
```
All the Tax Advisor chat messages of all the chat sessions for each user are created in this table.

## OpenAI API
### Analysis:
The OpenAI secret key is held in the .env file of the Backend. If there is no such key present in the .env, an alternate mock Tax Advisor is used for the chat instead.

When a user messages the Tax Advisor, the Backend provides the following to the OpenAI Chat Completions API using the secret key:
- A starting built-in instruction for the Tax Advisor 
```
"You are a helpful tax advisor. You answer plainly, straightforwardly, to the point, with short and easy to read responses for the user. Use markdown to format your responses."
```
- A history of the previous 10 messages of the given session.
- The user's current question.

The LLM model used is gpt-4o-mini.

## Containerization
- Docker
- Docker Compose

### Analysis:
The Frontend and Backend each contain a Dockerfile and .dockerignore. The docker-compose.yml file is at the root directory of the repository. It fires up the three services of the ai-tax-network, starting with the mysql service on default MySQL port 3306 and waits for it to finish starting up. Then, it starts the Backend service, completes the actions specified on the Backend Dockerfile and specifies the .env file to be used, exposing the app on port 5000 at the end. Finally, it does the same for the Frontend service on port 3000.

## Continuous Integration
- Github Actions

### Analysis:
Continuous Integration is implemented with Github Actions using the ci.yml file which resides in the .github/workflows folder of the root directory. The following script is specified to run when a push happens or pull request is merged to the remote main branch of the repository.
1. Starts the mysql service on the github virtual machine and waits for its startup to complete.
2. Copies the code from the repository to the github virtual machine.
3. Sets up NodeJS on it.
4. Creates the .env file needed for the backend from the .env.example file in the root directory.
5. Installs Backend dependencies and runs tests.
6. Installs Frontend dependencies and runs tests.
7. Builds the project using docker compose on the github virtual machine and checks its status.



## How to Run
### Clone the repository:
```console
git clone https://github.com/Agamemnonsrf/AI-Tax-Calc.git
```


### Run Locally with Docker Compose
#### Dependencies:
```
- Docker
- Docker Compose
```

#### Steps:
1. Go into the root directory
```console
cd AI-Tax-Calc
```

2. Make .env file for the Backend
```console
cp .env.example ai-tax-calc-backend/.env
```

3. Go to the Backend dir and and add the keys you want to use to the .env file

```console
cd ai-tax-calc-backend
```

4. Run with docker-compose on the root dir
```console
cd ..
docker-compose up
```

5. Open localhost:3000 in your browser

### Start Development Environment
#### Dependencies:
```
- NodeJS and NPM
- Docker
```
#### Steps:
1. Go into the root directory
```console
cd AI-Tax-Calc
```
2. Make .env file for the Backend
```console
cp .env.dev.example ai-tax-calc-backend/.env
```
3. Go to the Backend dir and and add the keys you want to use to the .env file

```console
cd ai-tax-calc-backend
```

4. Start the database container
```console
docker run -d \
  --name mysql-container-db \
  -e MYSQL_ROOT_PASSWORD=aitaxcalcpassword \
  -e MYSQL_DATABASE=aitaxcalcdb \
  -e MYSQL_USER=aitaxcalcuser \
  -e MYSQL_PASSWORD=aitaxcalcpassword \
  -p 3306:3306 \
  mysql:8
```

5. Install Backend dependencies and run
```console
npm i && npm run dev
```

6. Go to the Frontend dir, install dependencies and run
```console
cd ../ai-tax-calc
npm i && npm run dev
```

7. Run tests
```console
npm run test
```

8. Manage the database from the terminal
```console
docker exec -it mysql-container-db mysql -u root -p
```
