# Betty Blocks Assessment

This assessment consists of tests that verify functionality on the Betty Blocks Account Creation page

**NB: This has been executed successfully on macOS. Though I don't have access to a Windows or Linux machine. It should work fine if docker is not used. If you do use docker you would require an X Server to be setup first before executing tests.**

# Getting started

This setup is for running it locally on your given OS with the Cypress test runner

Option 1:

1.  Clone the repository by running: `git clone https://github.com/azaeng04/betty-blocks-assessment.git`
2.  Install the `node_modules` with either `yarn` or `npm`: `yarn install` or `npm install`
3.  Verify that Cypress can run on your system: `yarn cy:verify` or
    `npm run cy:verify`
4.  Open the Cypress runner: `yarn cy:open` or `npm run cy:open` and select a test suite to execute

Option 2: Just execute the tests headlessly

Same as Option 1 except step 4: Run Cypress headlessly `yarn test:chrome` or `npm run test:chrome`

**NB: Since this is running locally without Docker you would require atleast one common browser such as Chrome and/or Firefox. A list of supported Cypress browsers: https://docs.cypress.io/guides/guides/launching-browsers#Browsers**

# Executing with Docker

This setup is for running it locally on your given system with `docker compose` or `docker-compose`

1. Clone the repository by running: `git clone https://github.com/azaeng04/betty-blocks-assessment.git`
2. Execute the following command to build the docker image: `docker build -t betty-blocks-e2e .`
3. Execute the following command to execute the tests in either Chrome or Firefox:

   In Chrome:
   `docker compose run --rm e2e yarn test:chrome` or
   `docker-compose run --rm e2e yarn test:chrome` or
   `docker compose run --rm e2e npm run test:chrome` or
   `docker-compose run --rm e2e npm run test:chrome`

   OR Firefox

   `docker compose run --rm e2e yarn test:firefox` or
   `docker-compose run --rm e2e yarn test:firefox` or
   `docker compose run --rm e2e npm run test:firefox` or
   `docker-compose run --rm e2e npm run test:firefox`
