//executes an a value on another element if this element is triggerred
app.defineAttribute({
  name:"execon",
  match:"*",
  parser(attr,value){
    this[attr.replace("exec","")]=()=>{
      document.querySelectorAll(this.getAttribute("for")).forEach(e=>e.setAttribute("execute",value))
    }
  }
})