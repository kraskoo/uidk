const fs = require('fs');
const idk = require('./index');
const recordNumber = 8000000;
const filePath = './test-result.txt';

function writeRecords() {
  let data = [];
  // writing 8000000 records of ids
  return new Promise((resolve, reject) => {
    for (let i = 0; i < recordNumber; i++) {
      data.push(idk());
    }
  
    fs.writeFile(filePath, JSON.stringify(data), err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

function readRecords() {
  let hash = {};
  let ids = [];
  let originLength = 0;
  // Read records
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {
      encoding: 'utf8',
      flag: 'r'
    }, (err, data) => {
      if (err) {
        reject(err);
      }
  
      let lines = JSON.parse(data);
      originLength = lines.length;
      for (let line of lines) {
        if (!hash[line]) {
          hash[line] = true;
          ids.push(line);
        }
      }
      
      resolve({ idsLength: ids.length, originLength });
    });
  });
}


function readAndWriteRecords() {
  writeRecords().then(() => {
    readRecords().then(lengths => {
      console.log(`idsLength: ${lengths.idsLength}, originLength: ${lengths.originLength}`);
    }).catch(err => {
      if (err) {
        console.error(err);
      }
    });
  }).catch(err => {
    if (err) {
      console.error(err);
    }
  });
}

readAndWriteRecords();