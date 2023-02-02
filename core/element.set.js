//sets elements style, attribute or value (compatible with components)
Element.prototype.set=function(setup,...trailers){
  //set an attribute value
  if(setup.attr||setup.attribute){
    this.setAttribute(setup.attr||setup.attribute,setup.value)
    if((setup.attr=="value"||setup.attribute=="value")&&"value" in this)this.value=setup.value
  }
  //set a style value
  else if(setup.css||setup.style)this.style[setup.css||setup.style]=app.stylar(setup.value,this)
  
  //set inner value
  else {
    //if inserting data next to target
    if(setup.insert=="before"||setup.insert=="after")this.insertAdjacentHTML(setup.insert=="before"?"beforebegin":"afterend",setup.value)
    //if vannilla element then acts normal
    else if(!app.components[this.tagName]){
      //if inserting start or end data
      if(setup.insert=="start"||setup.insert=="end")this.insertAdjacentHTML(setup.insert=="start"?"afterbegin":"beforeend",setup.value)
      //else just directly set value
      else this.innerHTML=setup.value
    }
    
    //if component then support comp syntax
    else {
      app.diff(this)
      let value=this.getAttribute("value")||this.innerHTML
      //if inserting data to start or end
      if(setup.insert=="start")value=setup.value+value
      else if(setup.insert=="end")value+=setup.value
      //directly setting data
      else value=setup.value
      //reset value
      this.setAttribute("value",value)
      //refresh element
      app.mutation.core([this])
      
    }
  }
  if(trailers.length)trailers.forEach(e=>this.set(e))
  return this
}

//a component based implementation of the function above
app.defineComponent("set",function(){
  let target=this.parentElement
  //if attributal or styles then preparse data (smoother implementation not found yet)
  if(this.getAttribute("attr")||this.getAttribute("attribute")||this.getAttribute("style")||this.getAttribute("css")||this.getAttribute("var"))app.mutation.core([...this.children])
  this.setAttribute("value",this.innerHTML.trim())
  this.remove()
  target.set(app.sumup(this,"attrs"))
})