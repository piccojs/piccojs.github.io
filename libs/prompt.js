//gets data from user via prompt
app.defineComponent("prompt",function(){
  let res=prompt(this.getAttribute("placeholder"))
  this.outerHTML=res||this.innerHTML
})