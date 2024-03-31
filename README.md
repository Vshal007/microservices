1. First pull all the images

 docker pull vshal007/micro-front:v1.0
 docker pull vshal007/micro-auth:v1.0
 docker pull vshal007/micro-departments:v1.0
 docker pull vshal007/micro-employee:v1.0

2. docker-compose.yml file:

////////////////////////////////////// 
version: '3.8'

services:
  frontend:
    image: vshal007/micro-front
    ports:
      - "3000:3000"
    # Add any other frontend configurations here
    networks:
      - my-network

  micro-auth:
    image: vshal007/micro-auth
    ports:
      - "4000:4000"
    # Add any other configurations specific to your authentication service
    networks:
      - my-network

  employees:
    image: vshal007/micro-employee
    ports:
      - "5000:5000"
    # Add any other configurations specific to your employees backend
    networks:
      - my-network

  micro-departments:
    image: vshal007/micro-departments
    ports:
      - "8000:8000"
    depends_on:
      - employees
    # Add any other configurations specific to your departments backend
    networks:
      - my-network

networks:
  my-network:
    driver: bridge
/////////////////////////////////////////
