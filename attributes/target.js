//moves element to matching targets via a query selector string
app.defineAttribute({
  name:"target",
  match:"*:not(get)",
  parser(attr,value){
    //removes targeting
    this.removeAttribute(attr)
    this.remove()
    //adds a clone of itself to matching elements
    document.querySelectorAll(value).forEach(target=>{
      //create a clone of the node in question
      let clone=this.cloneNode(true)
      //append it to the target
      target.insertAdjacentElement("beforeend",clone)
      //force mutate node
      app.mutation.core([clone])
    })
  }
})