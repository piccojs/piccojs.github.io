//binds an element to a variable
app.defineAttribute({
  name:"from",
  match:"*:not(import)",
  parser(attr,value){
    if(!(value in app.variables)){
      try{Function(`let ${value};`)}catch(e){console.error(`"${value}" is not a valid variable name`);return}
      app.variables[value]=null
    }
    app.refresh(value)
  }
})

app.sync={
  local:{},
  session:{}
}

//creates a bind variable (only in html fn)
app.defineComponent("create",function(){
  //variable name
  let vn=this.getAttribute("var")
  //mutate kids then remove from dom
  app.mutation.core([...this.children])
  this.remove()
  //test if is a viable attribute name
  try{Function(`let ${this.getAttribute("var")};`)}catch(e){console.error(`"${this.getAttribute("var")}" is not a valid variable name`);return}
  //syncs to storages
  if(this.getAttribute("sync")){
    let sync = this.getAttribute("sync")
    if(sync=="session"){app.sync.session[vn]=true;this.innerHTML=sessionStorage[vn]||this.innerHTML}
    if(sync=="local"){app.sync.local[vn]=true;this.innerHTML=localStorage[vn]||this.innerHTML}
  }
  
  //parses inner html to JSON, then adds it to a cache in the app object
  let data=this.innerHTML
  try{data=JSON.parse(data)}catch(e){}
  app.variables[this.getAttribute("var").trim()]=data
  //refreshes dom
  app.refresh(this.getAttribute("var").trim())
  
  
})