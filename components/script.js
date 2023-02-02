app.functions={}
//creates inline async scripts, accepts a return value and passes it as the html replacement for the script element, mimics php like parsing.
//TODO: custom micro parser for converting syntactic imoorts to dynyamic imports (btw this led to making piccoScript, eish)
app.defineComponent("script",function(){
  //set default type
  let type=this.type||"async"
  //cache inner script if inline
  let script=this.innerText
  
  //if is a function type, can be called by passing the id to an elements event 
  if (script && this.id) {
    app.functions[this.id] = script;
    this.remove()
    return;
  }
  
  //inserts predata and post data to support var changes (vars and echo)
  let pre = Object.keys(app.variables).map(e=>`let ${e} = app.clone(app.variables["${e}"])`).join(";")+";const echo=e=>arguments[0].insertAdjacentHTML('beforebegin',e);"
  let post="\n"+Object.keys(app.variables).map(e=>`app.compare("${e}",${e})`).join(";")
  
  //run sync script, can be used inside tags like set, create etc.
  if(script&&type=="sync"){this.outerHTML=Function(`return function(){${pre}${script}${post}
    }`)().apply(this.parentElement)||"";return}
  
  //run an async function with the parent of the script tag as the global scope,makes it easy to edit the target.
  if(script&&type=="async")Function(`return async function(){${pre}${script}${post}
  }`)().apply(this.parentElement,[this])
  .then(e=>this.remove())
  
  
  //empties script incase parent is reparsed while script values are executed or fetched
  return ""
})

app.clone=function(data){
  if(typeof data=="object")return JSON.parse(JSON.stringify(data))
  return data
}
app.compare=function(v,data){
  //compares variable changes
  if(JSON.stringify(app.variables[v])!==JSON.stringify(data)){
    app.variables[v]=data
    app.refresh(v)
  }
}