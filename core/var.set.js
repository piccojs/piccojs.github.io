app.set={
  
}
app.setVarData=function(sum){
  //cache target name
  let target=sum.tagName.toLowerCase().replace("v:","")
  delete sum.tagName
  //cache value
  let value=sum.value
  delete sum.value
  //check if target exists
  if(!(target in app.variables))return "";
  //if get attribute then return user query or passed default value
  if(sum.get)return app.getVarData(target,sum.get)
  //if data type is number then parse with number function
  if(typeof app.variables[target]==="number")app.set.number(target,sum,value)
  //if data type is string then parse with string function
  if(typeof app.variables[target]==="string")app.set.string(target,sum,value)
  //if boolean cause why not
  if(typeof app.variables[target]==="boolean")app.set.bool(target,sum,value)
  //objects are more complex and need their own little space in the universe
  if(typeof app.variables[target]==="object"){
    try{value=JSON.parse(value)}catch(e){}
    //all object types can be converted to anything on the fly
    if(app.variables[target]===null||Object.keys(sum).length===0)app.variables[target]=value
    else if(Array.isArray(app.variables[target]))app.set.array(target,sum,value)
    else app.set.object(target,sum,value)
  }
  
  app.refresh(target)
  return ""
}

//number functions <v:name plus minus times divide random pi float roundup rounddown />
app.set.number=function(target,sum,value){
  //default number is one
  if(value==="")value=1
  //if value is not a number
  value=value-0
  if(Number.isNaN(value))return;
  
  //if directly setting the value
  if(Object.keys(sum).length===0)app.variables[target]=value
  
  //add value to number
  if("times" in sum)app.variables[target]*=value;
    //add value to number
  if("divide" in sum)app.variables[target]/=value;
  //add value to number
  if("plus" in sum)app.variables[target]+=value;
  //minus value to number
  if("minus" in sum)app.variables[target]-=value;
}


//set strings <v:name replace replaceall matches />
app.set.string=function(target,sum,value){
  //if directly setting the value
  if(Object.keys(sum).length===0)app.variables[target]=value
  //replace a match
  if("replace" in sum)app.variables[target]=app.variables[target].replace(sum.replace,value)
  //replace all matches
  if("replaceall" in sum)app.variables[target]=app.variables[target].replaceAll(sum.replaceall,value)
  //replace using regexp
  if("match" in sum)app.variables[target]=app.variables[target].replace(new RegExp(sum.match,sum.flags||""),match=>value.replaceAll("((match))",match))
  //insert value at the end
  if(sum.insert=="end")app.variables[target]=app.variables[target]+value
  //insert value at the start
  if(sum.insert=="start")app.variables[target]=value+app.variables[target]
}

//set bools <v:name toggle />
app.set.bool=function(target,sum,value){
  if("toggle" in sum){
    app.variables[target]=app.variables[target]?false:true
  } else app.variables[target]=value.trim().toLowerCase()=="true"?true:false
}

//set objects <v: key />
app.set.object=function(target,sum,value){
    try{Function("app.variables[arguments[0]]"+(sum.key||"").split(".").filter(e=>e).map(e=>Number.isNaN(e-0)?`["${e}"]`:`[${e}]`).join("")+"=arguments[1]")(target,value)}catch(e){console.log(e)}
}

//set object <v: push="pushes to last" unshift="pushes to front" index="set at index" insert last  fromlast(inserts value  filter map insert=(num || first || last) />
app.set.array=function(target,sum,value){
  if("push" in sum)app.variables[target].push(value)
  if("unshift" in sum)app.variables[target].unshift(value)
  if(sum.index)app.variables[target][sum.index]=value
  //if("last" in sum)app.variables[target][]
}