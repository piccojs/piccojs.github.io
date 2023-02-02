app.mutation.define=function(element){
  if(element.getAttribute("component")){
    //defines a component
    app.defineComponent(element.getAttribute("component"),function(){
      //inserts template html into component
      return app.insert({
        string:element.innerHTML,
        values:app.prefix(element.getAttribute("component")+".",app.sumup(this))
      })
    })
  }
  
  
  if(element.getAttribute("attribute")){
    //defines an attribute
    app.defineAttribute({
      name:element.getAttribute("attribute"),
      match:element.getAttribute("match")||"*",
      parser(name,value){
        this.insertAdjacentHTML("beforeend",app.insert({
          string:element.innerHTML,
          values:app.prefix(element.getAttribute("attribute"),{name,value})
        }))
      }
    })
  }
}