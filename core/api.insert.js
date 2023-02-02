//inserts data into a string
app.insert=function Insert(setup={}){
  return String(setup.string)
  .replace(/\(\(.*?\)\)/gi,match=>{
    let key=match.slice(2,-2)
    if(key in setup.values)return setup.values[key]
    return match
  })
}