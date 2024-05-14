<h1> 💻 LeanKata </h1>


# Index

- [Index](#index)
- [Description](#description)
- [Project Configuration](#project-configuration)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Authors](#authors)
- [Contributions](#contributions)

# Description


LeanKata is a web application developed with React that perfects the art of continuous improvement. It starts with our challenge boards to obtain solutions to problems using the lean methodology with a highly elaborate gear of boards that allows you to link them together. With an intuitive and attractive interface, you can explore different challenges, add, edit, modify, and delete new boards depending on their structure and where you are in the process. Additionally, you can include related images in the forms that require them.


## Project Configuration

1. **Clone the Repository:**

* Copy code in your terminal:
  ```
  git clone https://github.com/Elianarve/WebLeanKata.git
  ```

2. **Create the file __.env__**
   
* Create the file __.env__ located in the folder "Server"
* Copy the information placed on ´.env_example´ and fill it with your personal data


3. **Install Dependencies:** 

* Copy code in your terminal to enter in the repository back folder:
  ```
  cd server
  ```
* Copy code in your terminal:
  ```
  npm install

* Copy code to make the server run:
  ```
  npm run dev
  ```
  This will start the server __http://localhost:3000__ using the database on MySQL Workbench.


  
* Copy code in your terminal to enter in the repository front folder:
  ```
  cd client
  ```
* Copy code in your terminal:
  ```
  npm install
  ```
* Copy code to make the server run:
  ```
  npm run dev
  ```

## Postman documentation
<!-- https://documenter.getpostman.com/view/32563788/2sA3BkbCQq -->

## Test

* Copy code in your terminal to enter in the repository front folder:
  ```
  cd client

* Copy code:
  ```
  npm run test
  ```
This will run the front tests.

* Copy code in your terminal to enter in the repository back folder:
  ```
  cd server

* Copy code:
  ```
  npm run test
  ```
This will run the back tests.


## Project Structure 

 __CLIENT__ 
* __node_modules:__ contains all the dependencies of your project. When you install packages using npm, they are stored here.
* __server:__ contains the db.json with the api fake.
* __src:__
    * __assets:__ all the images.
    * __components:__ it contains the navbar and the footer.
    * __context:__ This code sets up an authentication context in React and provides a hook for accessing authentication data in functional components.
    * __layout:__ It features two main layouts: `LayoutPublic` and `LayoutPrivate`, responsible for defining the user interface structure for the pages.
    * __pages:__ All the pages of the web.
    * __router:__ route definitions for the methods of the API.
    * __services:__ the methods of the crud.
    * __test:__ unit and integration tests in one file.
    * __index.css:__ contains the styles.
    * __main.jsx:__ This code sets up the rendering of the React application.
* __.gitignore:__  specifies files and folders ignored by Git to prevent irrelevant or automatically generated files from being tracked.
* __index.html:__
* __package.json and package-lock.json:__ these files contain metadata about your project and its dependencies. They also include scripts for running various tasks like starting the development server or building the production bundle.
      

 __SERVER__ 
* __controllers:__ to handle HTTP requests.
* __database:__ configuration of connections with the database.
* __helpers:__ contains the import and export validations from express-validator.
* __Middleware:__ to add the tokens.
* __models__: the model of database.
* __node_modules:__ contains all the dependencies of your project. When you install packages using npm, they are stored here.
* __routes:__ route definitions for the methods of the API.
* __test:__ unit and integration tests in one file.
* __validators:__ contains the validations of the methods of the CRUD.
* __.env:__ is a configuration file commonly used to store environment variables.
* __.gitignore:__  specifies files and folders ignored by Git to prevent irrelevant or automatically generated files from being tracked.
* __app.js:__ entry point of the application.
* __config.js:__ application configuration, such as database and server configuration.
* __package.json and package-lock.json:__ these files contain metadata about your project and its dependencies. They also include scripts for running various tasks like starting the development server or building the production bundle.
* __README.md:__ this file typically contains instructions on how to set up and run your project, as well as any other relevant information for contributors or users.

# Technologies

<img width="50" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png">&nbsp;
<img width="40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png">&nbsp;
<img witdth="50" src="[![alt text](image.png)](https://store-images.s-microsoft.com/image/apps.47763.13959754522315136.87be3224-9693-4fd4-8cd4-af6362fb8d37.b3c24453-164b-4d03-b561-e77aec7c076a?h=464)">&nbsp;
<img width="50" src="https://seeklogo.com/images/H/html5-without-wordmark-color-logo-14D252D878-seeklogo.com.png">&nbsp;
<img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png">&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/183896128-ec99105a-ec1a-4d85-b08b-1aa1620b2046.png" >&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" >&nbsp;
<img width="50" src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg">&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png">&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png">&nbsp;
<img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png">&nbsp;
<img width="50" src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg">&nbsp;
<img width="50" src="https://media.licdn.com/dms/image/C560BAQHQH8_cFFK_3A/company-logo_200_200/0/1630606810347/drawsql_logo?e=2147483647&v=beta&t=aWOh8DYdF-g2BWxZPlX4b3vXC2Omo0TOSxqO0JHKvws">&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png">&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png">&nbsp;
<img width="50" src="https://cdn.worldvectorlogo.com/logos/nodemon.svg">&nbsp;
<img width="50" src="https://express-validator.github.io/img/logo.svg">&nbsp;
<img width="50" src="https://static-00.iconduck.com/assets.00/sequelize-original-icon-885x1024-r8dswyvj.png">&nbsp;

# Authors

 - Scrum Master:  [Eliana Rendón](https://github.com/Elianarve)
 - Product Owner: [Triana Soler Martín](https://github.com/TrianaSolerMartin)
 - Web Developer: [Estefanía ](https://github.com/EstefanyBatPel)
 - Web Developer: [Jessica Noguera González](https://github.com/JnogueraGonzalez)
 - Web Developer: [Nuria Vicente](https://github.com/NuriaVicenteRodriguez)


# Contributions
Contributions are welcome! If you find any problems or have suggestions for improvement, please create an issue or make a pull request.
   
**[⬆️ Back to Index](#index)**
