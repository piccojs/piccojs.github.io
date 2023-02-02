//handle events
app.defineAttribute({
  name:"on.",
  match:"*",
  parser(attr,value){
    let ext=attr.split(".").filter(e=>e)
    ext.shift()
    this["on"+ext.shift()]=event=>{
      this.event=event
      app.executeEvent.apply(this,[value,ext])}
  }
})

//event executor
app.executeEvent=function handler(value="",ext=[]){
  //prevent default action
  if(ext.includes("prevent"))event.preventDefault()
  //clear html
  if(ext.includes("clear"))this.set({value:""})
  // blur inputs
  if(ext.includes("blur"))this.blur()
  
  if(ext.includes("script")){
    //if is inline script
    this.insertAdjacentHTML("beforeend",`<script>${value}</script>`)
  }
  else if(value.trim() in app.functions){
    //function based
    this.insertAdjacentHTML("beforeend",`<script>${app.functions[value.trim()]}</script>`)
  } else {
    //inline html just freestyle
    this.set({insert:"end",value:app.insert({string:value,values:app.prefix("this.",app.sumup(this))})})
    if(ext.includes("clear")&&"value"in this)this.value=""
  }
    
  
}