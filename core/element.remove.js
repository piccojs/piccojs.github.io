
//Deletes attrs,initializes styles, or removes elements (can replace)
//extends default behavior, non-breaking.
Element.prototype.remove=function(setup={},...trailers){
  try{if(setup.attr||setup.attribute)this.removeAttribute(setup.attr||setup.attribute)
  else if(setup.css||setup.style)this.style[setup.css||setup.style]="initial"
  else this.outerHTML=setup.value||""}catch(e){app.logStack.push(e)}
  return this
}

//component based implimentation of the function above
app.defineComponent("remove",function(){
  let target=this.parentElement
  this.remove()
  target.remove(app.sumup(this,"attrs"))
})