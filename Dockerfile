# Use the official Node.js image with the desired version
FROM node:18.3.0-alpine3.14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies (excluding Husky hooks)
RUN npm set-script prepare '' && npm install --production

# Copy source code
COPY src ./src

# Copy .env file
COPY .env ./

# Expose port
EXPOSE 5000

# Start the application
CMD [ "node", "src/server.js" ]
