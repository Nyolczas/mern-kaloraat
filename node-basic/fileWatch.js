const fs = require('fs');
const fileName = './target.txt';

const errorHandler = err => console.log(err);

const dataHandler = data => console.log(data.toString());

exports.fileWatch = fs.watch(fileName, () => {
    fs.readFile(fileName, (err, data) => {
        if (err) errorHandler(err);
        dataHandler(data);
    })
});