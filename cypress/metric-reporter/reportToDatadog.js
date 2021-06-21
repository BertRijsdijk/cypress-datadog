const dogapi = require('dogapi');
const fs = require('fs');

const options = {
    api_host: "app.datadoghq.eu",
    api_key: process.env.API_KEY,
    app_key: process.env.APP_KEY
};
dogapi.initialize(options);

const resultsFolder = './cypress/results/';
const tags = { tags: ["env:prd", "functional-monitoring"] };

fs.readdirSync(resultsFolder).forEach(fileName => {
    let rawdata = fs.readFileSync(resultsFolder + fileName);
    let file = JSON.parse(rawdata);

    file.results.forEach(result => {
        result.suites.forEach(suite => {
            suite.tests.forEach(test => {
                if (test.pending) {
                    console.log("Pending test will not be reported: " + test.title);
                } else {
                    console.log("Executed test: " + test.title, [test.duration, test.state]);

                    dogapi.metric.send(`functional.monitoring.result.${test.state}.${test.title}`,
                        1, {type: "count", ...tags}, () => {});

                    dogapi.metric.send(`functional.monitoring.duration.${test.title}`,
                        [test.duration], tags, () => {});
                }
            });
        });
    });
});
