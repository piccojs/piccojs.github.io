app.importers={
  picco:{
    pre:new URL("libs/",app.src).href,
    post:".js"
  },
  unpkg:{
    pre:"https://unpkg.com/",
    post:".js"
  }
}

app.defineComponent("import",function(){
  //cache parent to insert data later
  let target=this.parentElement
  let pf=this.getAttribute("from")
  //sync to importers
  if(pf in app.importers)this.setAttribute("from",app.importers[pf].pre)
  //create a data scope
  this.setAttribute("from",new URL((this.getAttribute("from")||"..")+"/",target.closest("[scope]")?target.closest("[scope]").getAttribute("scope"):location.href).href)
  //set data scope to target
  this.remove()
  //cache siblings to reappend later
  let siblings=target.innerHTML
  //replace targets inners with a splach screen and cache said screen
  target.innerHTML=this.innerHTML||app.loadingScreen
  app.loadingScreen=target.innerHTML
  
  //collect base info
  let urls=this.getAttribute("libs").split(",").filter(e=>e).map(e=>new URL(e.trim(),this.getAttribute("from")).href+(pf in app.importers?app.importers[pf].post:""))
  //collect data
  Promise.all(urls.map(e=>app.cache(e)))
  .then(list=>{
    target.innerHTML=list.map((text,index)=>{
      let ext=urls[index].split(".").pop()
      //add styles
      if(["css","sass","scss","less","csx"].includes(ext))return `<style>${text}</style>`
      //import sync js
      else if(["js","ts","jsx","tsx","pi","pix"].includes(ext))return `<script scope="${urls[index]}" type=sync>${text}</script>`
      //import variables
      else if(["txt","json","xml"].includes(ext)){
        try{text=JSON.parse(text)}catch(e){}
        app.variables[this.getAttribute("as")||"e"]=text
        return `<script type=sync>${app.variables[this.getAttribute("as")||"e"]}=${app.variables[this.getAttribute("as")||"undefined"]}</script>`}
      //import html
      else {
        let temp=document.createElement("e")
        temp.innerHTML=text
        ;[...temp.children].forEach(e=>e.setAttribute("scope",urls[index]))
        return temp.innerHTML
      }
    }).join("")+siblings
  })
  
})