//execute custom events see onenter
app.defineAttribute({
  name:"execute",
  match:"*",
  parser(attr,value){
    this.removeAttribute(attr)
    app.executeEvent.apply(this,[value,attr.split(".")])
  }
})