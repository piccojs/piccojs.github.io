//get data of an element
Element.prototype.get=function(setup={},...trailers){
  
  let target=setup.target?document.querySelector(setup.target)||this:this
  //cache value
  if("value" in target)target.setAttribute("value",target.value)
  //
  if(setup.attr||setup.attribute)return target.getAttribute(setup.attr||setup.attribute)||setup.value
  //
  else if(setup.style||setup.css)return target.style[setup.style||setup.css]||setup.value
  else {
    //fetching inner html of components
    if(app.components[target.tagName]){
      app.diff(target)
      return target.getAttribute("value")||target.innerHTML||setup.value
    }
    //vannila function
    else return target.innerHTML||setup.value
  }
  
  
  return target
}

//component implimentation of the function above
app.defineComponent("get",function(){
  this.outerHTML=this.parentElement.get(app.sumup(this,"attrs"))
  return ""
})