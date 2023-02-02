//conditional environments... used for ifs, switches etc. returns false if condition fails or syntax errors occour (depends on the sumup api)

app.cenv=function(el,test="",extra={}){
  let res=false;
  try{res=Function(`${Object.keys(app.variables).map(e=>`let ${e}=app.variables.${e}`).join(";")};return ${test}`).apply(app.sumup(el))}catch(e){}
  return res
}

app.defineAttribute({
  name:"if",
  match:"*",
  parser(attr,value){
    if(!app.cenv(this.parentElement,value))this.remove()
  }
})