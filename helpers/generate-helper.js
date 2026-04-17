module.exports.generateRandomString=(len)=>{
  const character="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let res=""
  for (let i=0; i<len; i++){
    res+=character.charAt(Math.floor(Math.random()*character.length))
  }
  return res;
}
module.exports.generateRandomInteger=(len)=>{
  const character="0123456789";
  let res=""
  for (let i=0; i<len; i++){
    res+=character.charAt(Math.floor(Math.random()*character.length))
  }
  return res;
}