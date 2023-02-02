//flattens values into an insertable type supported by binds and insert comps
app.flatten=function(value){
  //turn into an array, the base format
  if(!Array.isArray(value))value=[value]
  //turn non objects into objects with default key as value
  value=value.map(e=>{
    if(typeof e!="object"||(typeof e=="object"&&e===null))return {value:e}
    return e
  })
  //flatten inner objects and arrays
  value=value.map(raw=>{
    let item={}
    let loop=(obj,prefix)=>{
      for(let key in obj){
        if(typeof obj[key]!=="object")item[prefix+key]=obj[key]
        else {
          //if was null
          if(obj[key]===null)item[prefix+key]=obj[key]
          
          else if(obj[key] instanceof Array){
            //if is array
            item[prefix+key+".length"]=obj[key].length
            obj[key].map((el,index)=>{
              //if not object
              if(typeof el!=="object"||(el===null))item[prefix+key+"."+index]=el
              else loop(el,prefix+key+"."+index+".")
            })
          } else loop(obj[key],prefix+key+".")
        }
      }
    }
    loop(raw,"")
    return item
  })
  return value
}
