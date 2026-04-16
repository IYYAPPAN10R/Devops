# Use Node.js official image
FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from backend folder
COPY backend/package*.json ./backend/

# Install dependencies
WORKDIR /usr/src/app/backend
RUN npm install --production

# Copy the rest of the backend and frontend
WORKDIR /usr/src/app
COPY backend ./backend
COPY frontend ./frontend

# Expose port
EXPOSE 5000

# Start the application
WORKDIR /usr/src/app/backend
CMD [ "node", "server.js" ]
