//on item click for list and bind arrays
app.defineAttribute({
  name:"on.itemclick",
  match:"*",
  parser(attr,value){
    this.onclick=event=>{
      let cp=event.composedPath()
      cp.forEach((el,index)=>{
        if(el===this){
          event.root=cp[index-1]||el
          event.preroot=cp[index-2]||el
        }
      })
      
      event.index=[...this.children].indexOf(event.root)
      event.value=this.getAttribute("from") in app.variables?(Array.isArray(app.variables[this.getAttribute("from")])?app.variables[this.getAttribute("from")][event.index]:app.variables[this.getAttribute("from")]):undefined
      
      this.event=event
      this.setAttribute("execute."+attr,value)
    }
  }
})