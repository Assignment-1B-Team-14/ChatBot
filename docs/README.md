[![Build Status](https://travis-ci.org/Assignment-1B-Team-14/ChatBot.svg?branch=master)](https://travis-ci.org/Assignment-1B-Team-14/ChatBot)

# ChatBot Team 14

Creating a [Chat Bot](https://raw.githubusercontent.com/Assignment-1B-Team-14/ChatBot/master/docs/Assigment1B.pdf) for AUT Software Engeneering Lecture (Semseter 1 / 2018)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Linux (Ubuntu)

#### Prerequisites

In order to set up the project, some packages must first be installed.

Java SE Development Kit (JDK):

```
# update package list
sudo apt-get update
# install JDK
sudo apt-get install -y default-jdk
```

Node.js:

```
# add the node.js repository to the package manager
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
# update package list
sudo apt-get update
# install node.js
sudo apt-get install -y nodejs
```

Git:

```
# install git client
sudo apt-get install git
```

#### Installing

A step by step series of examples that tell you how to get a development env running.

Open a shell and enter the commands step by step.

##### Step 1 - Download the code from Github

###### Download code using ssh:

```
# clone Github repository
git clone git@github.com:Assignment-1B-Team-14/ChatBot.git
```

###### Download code using https:

```
# clone Github repository
git clone https://github.com/Assignment-1B-Team-14/ChatBot.git
```

##### Step 2 - Compile and start the backend

In this step we will build the backend and get it running locally.

```
# go to backend directory
cd ChatBot/code/backend/
# compile the code and build a runnable .jar file
./ mvnw install
# go to target directory
cd target/
java -jar main-0.0.1-SNAPSHOT.jar
```

If no errors occurred the backend should be up and running on your local machine.

##### Step 3 - Compile and start the frontend

To start the frontend, we have to open a second shell first.
You can do this by pressing `CTRL+ALT+T`.
In the new shell, go to the root directory of the ChatBot project.

```
cd /.../ChatBot/
```

###### Start the mobile frontend in development mode:

To start the mobile frontend we first have to switch to the correct folder. Then we start the application in development mode.

```
# go to mobile directory
cd code/frontend/mobile/
# download the dependencies
npm install
# run the mobile frontend in development mode
npm start
```

Yarn (if installed) can be used as an alternative to npm.

```
# go to mobile directory
cd code/frontend/mobile/
# download the dependencies
yarn install
# run the mobile frontend in development mode
yarn start
```

Now the server for the mobile frontend should run. To view the app, follow the instructions in the shell.

###### Start the web frontend in development mode:

To start the web frontend we first have to switch to the correct folder. Then we start the application in development mode.

```
# go to web directory
cd code/frontend/web/
# download the dependencies
npm install
# run the web frontend in development mode
npm start
```

Yarn (if installed) can be used as an alternative to npm.

```
# go to web directory
cd code/frontend/web/
# download the dependencies
yarn install
# run the web frontend in development mode
yarn start
```

Now the server for the web should be running frontend. Normally your standard internet browser should open automatically with the mobile website. If this is not the case, open your browser and go to the following url:

```
localhost:3000
```

The url and the port can be different. If given, read the data for your system in the shell and use these.

## Built With

### Tools

#### Code Colaboration

```
GitHub
```

#### Continuous integration and delivery

```
TravisCI
```

#### Task Tracking

```
Asana
```

---

### Technology Stack

Three-Tier-System

#### Database Tier:

```
MySql
```

#### Bussiness Tier:

```
Spring Boot

RESTfull Service

Security via Spring Security

Database Acess with JPA and Spring Data
```

#### Frontend Tier:

```
Mobile Devices:   React Native Apps

Desktop Devices:  React.js (Maybe with Electron)
```

---

[Technology Stack:](https://github.com/Assignment-1B-Team-14/ChatBot/blob/master/docs/TechnologyStack.jpg)
![Technology Stack](https://raw.githubusercontent.com/Assignment-1B-Team-14/ChatBot/master/docs/TechnologyStack.jpg)

### Team Members

* Shailendrasinh Vijaysinh Jadeja
* Antony Nugroho
* Florian Widder
* Ashton Ho

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://assignment-1b-team-14.github.io/ChatBot/)
