app.mutation={
  //mutate elements with their attributes
  core:function CoreMutations(elements){
    elements.forEach(element=>{
      
      //if is definition
      if(element.tagName=="DEFINE"){
        app.mutation.define(element)
        element.remove()
        return;
      }
      
      //if is setting or getting variable data
      if(String(element.tagName).startsWith("V:")){
        app.mutation.core([...element.children])
        element.outerHTML=app.setVarData(app.sumup(element,"attrs"),element)
        return;
      }
      
      //refresh attributes
      ;[...(element.attributes||[])].map(e=>app.mutation.attr({attr:e.name,value:e.value,target:element}))
      //incase attributes caused element to be removed from dom
      if(!element.isConnected)return;
      
      //parse custom components
      if(element.tagName in app.components){
        //cache html to value
        if(!element.hasAttribute("value"))element.setAttribute("value",element.value||element.innerHTML)
        
        //if element returns an html string to replace its innerHTML (incase of parsing children)
        let res=String(app.components[element.tagName].apply(element)||"")
        if(res!==undefined)element.innerHTML=res
        
      }
      
      //if is element and has children and is still connected to the dom,then parse children, recursive. errors may happen here 
      if(element.tagName&&element.isConnected)app.mutation.core([...element.children])
      
    })
  },
  
  //mutate attributes that positively change
  attr(data){
    for(let i=0;i<app.attributes.length;i++){
      if(!data.target.isConnected)break;
      let curr=app.attributes[i]
       if(data.attr.startsWith(curr.name)&&data.target.matches(curr.match))curr.parser.apply(data.target,[data.attr,data.value])
       if(!data.target.isConnected)break;
    }
  }
}