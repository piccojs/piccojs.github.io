//handle events
app.defineAttribute({
  name:"on.enter",
  match:"*",
  parser(attr,value){
    this.onkeyup=event=>{
      this.event=event
      if(event.keyCode===13&&this.value)this.setAttribute("execute."+attr,value)
    }
  }
})