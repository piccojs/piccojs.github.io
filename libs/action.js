//does some js specific global actions to targets
app.defineComponent("action",function(){
  let target=this.parentElement
  this.remove()
  
  let actions={
    clear:()=>{
      target.value=""
      target.innerText=""
    },
    blur:()=>target.blur(),
    focus:()=>target.focus(),
    design:()=>document.designMode=document.designMode=="on"?"off":"on"
  }
  
  this.innerText.toLowerCase().replaceAll(" ",",").split(",").filter(e=>e).forEach(e=>{
    if(e in actions)actions[e]()
  })
  
})