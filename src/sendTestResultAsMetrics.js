const dogapi = require("dogapi");
const fs = require("fs");
const filesLocation = ('../cypress/reports/mochawesome/');

const api_host = process.env.API_HOST;
const api_key = process.env.API_KEY;
const app_key = process.env.APP_KEY;

const options = {
    api_host: api_host,
    api_key: api_key,
    app_key: app_key,
};

function readFile() {
    return new Promise(function(resolve, reject) {
        fs.readdir(filesLocation, function(err, data) {
            if (err) return reject(err);
            resolve(data);
        })
    })
}
dogapi.initialize(options);

let promise = readFile();
promise.then(iterateThroughTestSuitesAndSendMetrics);

function iterateThroughTestSuitesAndSendMetrics(data) {
    if (data.length === 0) {
        console.log('no test reports found, no metrics sent to datadog');
    } else {
        for (let f=0; f < (data.length); f++){
            const mochaAwesomeReport = require('../cypress/reports/mochawesome/' + (data[f]));
            for (let i=0; i < mochaAwesomeReport.results.length; i++) {
                for (let j = 0; j < mochaAwesomeReport.results[i].suites.length; j++) {
                    for (let k = 0; k < (mochaAwesomeReport.results[i].suites[j].tests.length); k++) {

                        dogapi.metric.send("function.monitoring.checkout." + (mochaAwesomeReport.results[i].suites[j].tests[k].title) +
                            ".result", 1, {type: "count", tags: ["env:prd","alertLevel:"+
                            (mochaAwesomeReport.results[i].suites[j].tests[k].state)]}, function(err, results){

                        console.log(("function.monitoring.checkout." + (mochaAwesomeReport.results[i].suites[j].tests[k].title) +
                            ".result." + (mochaAwesomeReport.results[i].suites[j].tests[k].state)));
                        });
                    }
                }
                }
            }
        }
}