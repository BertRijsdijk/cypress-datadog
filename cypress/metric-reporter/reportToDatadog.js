const options = {
    const options = {
    api_host: api_host,
    api_key: api_key,
    app_key: app_key,
};
};
const dogapi = require('dogapi');
const testFolder = './cypress/results/';
const fs = require('fs');
dogapi.initialize(options);

fs.readdirSync(testFolder).forEach(fileName => {
    let rawdata = fs.readFileSync(testFolder + fileName);
    let file = JSON.parse(rawdata);
    file.results.forEach(result => {
        result.suites.forEach(suite => {
            suite.tests.forEach(test => {

                console.log("function.monitoring.checkout.duration." + (test.title)
                    , [(test.duration),(test.state)]);

                dogapi.metric.send("function.monitoring.test.duration." + test.title
                    , [test.duration,test.state, file.stats.start, file.stats.end]
                    , {tags: ["env:prd", "e2e functional monitoring"]}, function(err, results){
                    });
            });
        });
    });
});
