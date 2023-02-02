//creates an alert
app.defineComponent("alert",function(){
  //mutate children before alerting
  app.mutation.core([...this.children])
  this.remove()
  alert(this.innerHTML)})