//clears inner Html before writing
app.defineComponent("clear",function(){
  let target=this.parentElement
  target.innerHTML=this.innerHTML
})