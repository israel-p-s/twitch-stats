# Utiliza una imagen de Node.js
FROM node:18

# Crea un directorio para la aplicación
WORKDIR /usr/src/app

# Copia el archivo de dependencias del proyecto (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que tu aplicación se ejecutará, suponiendo que es el 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
