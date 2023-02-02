//observes changes in body
app.observer=new MutationObserver(MutationRecords=>{
  //target is every mutation 
  MutationRecords.forEach(target=>{
    //if document just started loading then all scripts should be misnamed, they are the main cause of render blocking (picco's worst nightmare)
    if(document.readyState==="loading"){
      if(target.type=="childList")[...(target.addedNodes||[])].filter(e=>e.tagName=="SCRIPT"&&e.matches("body script")).map(e=>e.type=e.type||"async")
      return;
    }
    //if is element mutate both attributes and nodes
    if(target.type=="childList")app.mutation.core([...(target.addedNodes||[])])
    //if an attribute is added or changed, removed attributes are ignored
    else {
      if(target.target.hasAttribute(target.attributeName))app.mutation.attr({target:target.target,attr:target.attributeName,value:target.target.getAttribute(target.attributeName)})
    }
  })
})