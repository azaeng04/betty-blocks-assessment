FROM cypress/included:8.1.0

COPY package.json /e2e/
COPY yarn.lock /e2e/
COPY . /e2e/
WORKDIR /e2e/
RUN apt-get update -y && apt-get upgrade -y && apt-get install chromium -y
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
RUN yarn install

ENTRYPOINT []
