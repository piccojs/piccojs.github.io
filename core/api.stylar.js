//for css based attributes or components,
app.stylar=function(string="",el=document.body){
  //shortcut writing variables --var
  string=string.replace(/\-\-\w+/gi,(match,pos,string)=>{if(string.substring(0,pos).trim().endsWith("var("))return match; else return "var("+match+")"})
  .replace(/url\(.*?\)/gi,match=>{
    let scope=el.closest("[scope]")?el.closest("[scope]").getAttribute("scope"):location.href
    return match.replace(match.slice(4,-1).trim(),new URL(match.slice(4,-1).trim(),scope).href)
    
  })
    
  return string
}