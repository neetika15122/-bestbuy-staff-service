# Use an official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Set the default command to run the application
CMD ["node", "app.js"]
