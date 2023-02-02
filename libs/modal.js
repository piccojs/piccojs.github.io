//modals that ...
app.defineComponent("modal",function(){
  let scope=this.closest("[scope]")?this.closest("[scope]").getAttribute("scope"):location.href
  
  //if is not in body
  if(this.parentElement!==document.body){
    this.setAttribute("scope",scope)
    this.remove()
    document.body.insertAdjacentHTML("beforeend",this.outerHTML)
    return;
  }
  
  //set default theme of modals
  this.set({css:"position",value:"fixed"},{css:"top",value:"0"},{css:"left",value:"0"},{css:"width",value:"100%"},{css:"height",value:"100%"},{css:"zIndex",value:"5"},{css:"display",value:"flex"})
  
  //if is external modal
  if(this.getAttribute("src")){
    this.setAttribute("scope",this.getAttribute("src"))
    app.cache(this.getAttribute("src"))
    .then(e=>this.innerHTML=e)
  }
  
  //add a record of the modal to the history stack
  history.pushState(btoa(Math.random()), null, location.href)
  //add a backdrop cancel event
  this.onclick=e=>this.getAttribute("static")===null&&e.target===this?history.back():""
  //return splash screen 
  return this.getAttribute("value")
})


//on back press remove last added modal
window.onpopstate=e=>{
  let el=[...document.querySelectorAll("modal")].pop()
  if(el)el.remove()
}

//opens a page as modal on click
app.defineAttribute({
  name: "open",
  match: "*",
  parser(attr, value) {
    if (value.startsWith("https://") || value.startsWith("http://")) return;
    let scope = this.closest("[scope]") ? this.closest("[scope]").getAttribute("scope") : location.href
    this.setAttribute(attr, new URL(value, scope).href)
  }
})

app.defineAttribute({
  name:"open",
  match:"*",
  parser(attr,value){
    this.onclick=e=>document.body.insertAdjacentHTML("beforeend",`<modal src="${value}"></modal>`)}
})