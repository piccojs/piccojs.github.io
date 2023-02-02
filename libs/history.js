app.defineAttribute({
  name:"history",
  match:"*",
  parser(attr,value){
    if(attr=="history.back")this.onclick=e=>history.back()
  }
})