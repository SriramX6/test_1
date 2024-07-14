FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE  8000

RUN node -v

RUN npm -v

CMD ["node" , "index.js"]






# FROM node:20

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE  8000

# RUN node -v

# RUN npm -v

# CMD ["node" , "index.js"]