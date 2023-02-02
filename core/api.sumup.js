//sum up the common gets of an element
app.sumup=function(el,focus){
  let obj={}
  ;[...el.attributes].forEach(e=>obj[e.name]=e.value)
  obj.value=el.value||obj.value||el.innerHTML.trim()
  obj.tagName=el.tagName
  if(focus=="attrs")return obj;
  obj.style={}
  ;(el.getAttribute("style")||"").split(";").filter(e=>e).map(e=>{
    e=e.split(":")
    obj.style[e[0]]=e[1]
    obj["style."+e[0]]=e[1]
  })
  obj.event=el.event||{}
  return obj
}