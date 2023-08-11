# Use the official Node.js image
FROM node:18.3.0-alpine3.14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 5000

# Start the application
CMD [ "node", "src/server.js" ]
