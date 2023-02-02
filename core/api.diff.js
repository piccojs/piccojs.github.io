//removes stale data from element temps, used to add new data to components that 
app.diff=function(el){
  let html=el.getAttribute("value")
  let chtml=el.innerHTML
  
  //parse temp html
  let temp=document.createElement("temp")
  temp.innerHTML=html
  //remove children that dont exist anymore (temptags)
  ;[...temp.children].forEach(e=>el.querySelector(e.tagName.toLowerCase())?"":e.remove())
  
  //reset value
  el.setAttribute("value",temp.innerHTML)
  
  return app
}