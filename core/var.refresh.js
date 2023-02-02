//refreshes bound variables if not stale/cached
app.refresh=function(v){
  let stale=JSON.stringify(app.variables[v])
  //sync to storages
  if(v in app.sync.session)sessionStorage[v]=stale
  if(v in app.sync.local)localStorage[v]=stale
  
  document.body.querySelectorAll(`[from="${v}"]`)
  .forEach(target=>{
    
    //ignore elements that were already parsed
    if(target.getAttribute("cache")===stale)return;
    else target.setAttribute("cache",stale)
    
    //cache templates for reuse
    if(!target.getAttribute("template"))target.setAttribute("template",target.innerHTML)
    
    
    //reset innerValue
    target.set({value:app.flatten(app.variables[v])
    .map(item=>app.insert({string:target.getAttribute("template"),values:app.prefix(v+".",item)}))
    .join("")
    })
    
  })
}