app.getVarData=function(target,query){
  let data=app.variables[target]
  //get static data
  if(typeof data!=="object"||data===null)return String(data)
  
  //get object based data
}