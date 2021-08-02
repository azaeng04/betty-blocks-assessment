FROM cypress/included:8.1.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /e2e/

COPY . /e2e/

COPY package.json /e2e/

COPY yarn.lock /e2e/

RUN yarn install --no-optional

RUN apt-get update -y && apt-get upgrade -y && apt-get install chromium -y


ENTRYPOINT []
