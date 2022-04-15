const data = require('./source/en.json')
const fetch = require('node-fetch')
let values = [];

function getValues(data){
    if(typeof data === 'object'){
        for(let key in data){
            getValues(data[key])
        }
    }
    else{
        const obj = {
            english: data
        }
        values.push(obj)
    }
}

getValues(data)

const keyify = (obj, prefix = '') => 
  Object.keys(obj).reduce((res, el) => {
    if( Array.isArray(obj[el]) ) {
      return res;
    } else if( typeof obj[el] === 'object' && obj[el] !== null ) {
      return [...res, ...keyify(obj[el], prefix + el + '.')];
    }
    return [...res, prefix + el];
  }, []);

 const keysArray = keyify(data)

 
values.forEach((item,index) => {
    item['iD'] = keysArray[index]
})


 addRows({data: values})

async function addRows(payload) {
    const response = await fetch('https://v1.slashapi.com/ak/google-sheets/LClD4PNsvF/lang', {
        method: 'post',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log(data);
}

