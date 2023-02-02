//activate observer
app.observer.observe(document.documentElement,{childList:true, attributes:true,subtree:true})

//when steve can recieve love
document.addEventListener("DOMContentLoaded",function(){
    //set default theming
    if(!document.body.hasAttribute("theme"))document.body.setAttribute("theme","light")
    if(!document.body.hasAttribute("accent"))document.body.setAttribute("accent","#e91e63")
    
    //add favicon path
    let favicon=app.manifest.icon?new URL(app.manifest.icon,location.href).href:new URL("/favicon.ico",app.src).href
    
    document.head.insertAdjacentHTML("beforeend",`
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <meta name=theme-color content="${document.body.getAttribute("accent")}">
     <meta name="color-scheme" content="${document.body.getAttribute("theme")=="light"?"light dark":"dark light"}">

     <link rel=icon href="${favicon}">
     
     
    `)
    document.title=document.title||app.manifest.title||"Picco App"
    
    //mutate body safely
    app.mutation.core([document.body])
  
})