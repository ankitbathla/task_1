const fs = require("fs");
const axios = require("axios");
function readFile() {
    return new Promise((resolve, reject) => {
        console.log("reading breed.txt");
        fs.readFile("./breed.txt", "utf8", function (err, data) {
            if (err) {
                return reject(new Error("file cant be read"));
            } else {
                resolve(data);
            }
        });
    });
}

function fetchData(name) {
    return axios.get(`https://dog.ceo/api/breed/${name}/images/random`);
}

function writeData(url) {
    return new Promise((resolve, reject) => {
        fs.writeFile("./result.txt", JSON.stringify(url), (err) => {
            if (err) {
                reject(new Error("file cant be write"));
            } else {
                resolve();
            }
        });
    });
}

function main() {
    return new Promise((resolve, reject) => {
        readFile()
            .then((data) => {
                fetchData(data).then((response) => {
                    console.log(response.data);
                    writeData(response.data.message).then(() => {
                        console.log("url is sent to the file");
                        console.log("completed");
                        resolve(true);
                    });
                });
            })
            
    });
}
main();
module.exports = { readFile, writeData, fetchData, main };
