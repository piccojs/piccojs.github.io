app.defineComponent("event",function(){
  let target=this.parentElement
  this.remove()
  let event="on."+(this.getAttribute("type")||"click")
  target.setAttribute(event,this.innerHTML)
})