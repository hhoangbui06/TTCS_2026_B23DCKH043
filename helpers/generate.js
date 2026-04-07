module.exports.generateRandomString=(length)=>{
  const character="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let res=""
  for (let i=0; i<length; i++){
    res+=character.charAt(Math.floor(Math.random()*character.length))
  }
  return res;
}