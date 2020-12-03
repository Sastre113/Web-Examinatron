const bcrpyt = require('bcryptjs')

const password = '12345';

const getHash = async (password) =>{
    return await bcrpyt.hash(password, 8)    
}

const comparar = async (password) =>{
    return await bcrpyt.compare(password, await getHash(password));
}

comparar('123').then((data) =>{
    console.log("Comparacion: ", data);
});
