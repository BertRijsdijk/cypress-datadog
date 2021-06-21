# mochawesome datadog integration for functional monitoring
Translate Cypress test results too Datadog metrics with the help of the Mochawesome reporter

## Prerequisites
-   nodejs

## Install
-   `yarn install`

## Run Cypress tests locally
-   `yarn run cypress open`
    
or headless
-   `yarn run cypress run`

## Send metrics
Clean test results
-   `yarn run pre-monitor`

Run tests
-   `yarn run monitor`

Push test results to Datadog:
-   `yarn run post-monitor`

## To Do
Error handling on Metric.send in reportToDatadog.js

## Other
- Remember to set API_KEY and APP_KEY as env variables
- Thanks Jochum Börger and Erik Zeedijk for input and feedback

