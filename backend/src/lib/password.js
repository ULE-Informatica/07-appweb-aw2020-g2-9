const bcrypt = require('bcryptjs');
const helpers= {};

helpers.encryptPassword= async (password) => {
    const patron=await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password,patron);
    return hash;
}

helpers.matchPassword = async (password,savedPassword) =>{
    try{
        return await bcrypt.compareSync(password,savedPassword);
        
    }catch(error){
        console.log(error);
        
    }

}

module.exports=helpers;
