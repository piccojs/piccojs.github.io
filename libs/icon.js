//dynamically loaded icons
app.defineComponent("icon",function(){
  let text=[...this.childNodes].filter(e=>e.nodeName=="#text").map(e=>e.nodeValue).join("").trim()
  if(!text)return;
  app.cache("icons/"+text.replaceAll(" ","-")+".svg")
  .then(e=>this.innerHTML=e.replace("<svg",'<svg style="width:100%;height:100%" '))
  return ""
})