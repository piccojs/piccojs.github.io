//scoped style component, reason if you cant idetify the parent element or in inline component defines
app.defineComponent("style",function(){
  let style=this.getAttribute("value")
  //if element has an id, then replace "this" selector with element id
  if(this.id)style=style.replaceAll("this","#"+this.id)
  else {
    //if no id is found then use a custom identifier, in this case its attr [sid] : style ID
    if(!this.parentElement.hasAttribute("sid"))this.parentElement.setAttribute("sid",Math.random())
    style=style.replaceAll("this",'[sid="'+this.parentElement.getAttribute("sid")+'"]').trim().replace(/--\w+/g,(match,pos,string)=>{if(string.substring(0,pos).trim().endsWith("var("))return match; else return "var("+match+")"})
  }
  return style
})