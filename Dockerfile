
# Use an official Node runtime as a base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Security: Run as non-root user
# Create app user and group with least privilege    
RUN addgroup -S appgroup && adduser -S appuser -G appgroup


# Copy package files and install dependencies
# (This layer is separated to utilize Docker cache)
COPY package*.json ./
RUN npm install --only=production


# Copy application code
COPY . .

# Security: Set proper permissions
RUN chown -R appuser:appgroup /app

# Security: Switch to non-root user
USER appuser

EXPOSE 3000

# Define the command to run the app
CMD ["node", "app.js"]