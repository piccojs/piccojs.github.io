//adds prefixes in objects
app.prefix=function(pre,obj){
  return Object.assign({},...Object.entries(obj).map(e=>{return {[pre+e[0]]:e[1]}}))
}
