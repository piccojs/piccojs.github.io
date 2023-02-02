//switches between possibles if the "if" condition does not suffice
app.defineComponent("switch",function(){
  let root=this.parentElement
  //
  this.remove()
  let res=[...this.children].filter(item=>{
    let condition=item.getAttribute("case")||"false"
    if(app.cenv(root,condition))return true })
    if(res.length===0)res=[...this.querySelectorAll("[case='default']")]
    root.append(...res)
})