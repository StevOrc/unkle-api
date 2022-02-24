This API is an introdcution to the basic concepts of an Nodejs API.

The application is based on the Express framework and a MongoDB database.

Here are the steps to follow for running the API locally :

    1 - git clone https://github.com/StevOrc/unkle-api

    2 - run :

                npm i

    3 - You need to have Docker installed and running on your machine (the app will use a mongodb container). Run the following command :

                docker-compose up -d

    4 - create a ".env" file to the root of the project and enter :

                PORT=4000
                MONGO_URI=mongodb://localhost:27017/unkle

    5 - run this command to start the application locally :

                npm run dev
