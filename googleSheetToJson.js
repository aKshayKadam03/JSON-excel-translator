const fs = require('fs')
const fetch = require('node-fetch')
const obj = {}

async function getRows() {
    const response = await fetch('https://v1.slashapi.com/ak/google-sheets/LClD4PNsvF/translated', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    });
    const res = await response.json();
    createJson(res.data);
    const jsonData = JSON.stringify(obj)
    writeToJSON(jsonData)
}

getRows()


function createJson(data){
    for(let i = 0; i < data.length; i++){
       const keyArray = data[i]['iD'].split('.')
       let temp = obj;
       for(let k = 0; k < keyArray.length; k++){
           if(k < keyArray.length - 1){
               if(temp[keyArray[k]] === undefined){
                temp[keyArray[k]] = {};
               }
               else{
                temp[keyArray[k]] = temp[keyArray[k]];
               }
               temp = temp[keyArray[k]]
                
           }
           else{
            temp = temp[keyArray[k]] = data[i]['arabic']
           }
       }
    }
}


function writeToJSON(str){
    fs.writeFileSync("./target/ar.json", str, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The json was generated");
    });
}
