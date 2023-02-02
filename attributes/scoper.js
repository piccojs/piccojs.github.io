//scopes links and resources to their nearest parental scope, 
app.defineAttribute({
  name:"src",
  match:"*",
  parser(attr,value){
    if(value.startsWith("https://")||value.startsWith("http://"))return;
    let scope=this.closest("[scope]")?this.closest("[scope]").getAttribute("scope"):location.href
    this.setAttribute(attr,new URL(value,scope).href)
  }
})

app.defineAttribute({
  name:"href",
  match:"*",
  parser(attr,value){
    if(value.startsWith("https://")||value.startsWith("http://"))return;
    let scope=this.closest("[scope]")?this.closest("[scope]").getAttribute("scope"):location.href
    this.setAttribute(attr,new URL(value,scope).href)
  }
})

