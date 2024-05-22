--HOW TO PACKAGE AND MAKE DISTRIBUTABLE THE DESKTOP APP

1. You have to install the electron app and frontend dependencies.
2. You have to run the npm run build script to get the static folder from the React(vite) frontend in electron app.
3. You hace to run the npm run package script.
4. You have to run npm run make script; this will create a out folder, there will be the make folder with the executable.

   When you execute the .exe file to install the application, a folder will be create at user Roaming folder, there will be the logs folder and the database.db file, thats the embedded database from SQLite.
