//set element or body accent
app.defineAttribute({
  name:"accent",
  match:"*",
  parser(attr,value){
    this.style.setProperty("--accent",value.trim().replace(/--\w+/g,(match,pos,string)=>{if(string.substring(0,pos).trim().endsWith("var("))return match; else return "var("+match+")"}))
  }
})

app.themes={
  light:{
    text:"#454545",
    background:"#ffffff",
    foreground:"#cecece",
    shadow:"#00000020"
  },
  dark:{
    text:"#cccccc",
    background:"#101010",
    foreground:"#202020",
    shadow:"#00000080"
  },
  oled:{
    text:"#bbbbbb",
    background:"#000000",
    foreground:"#101010",
    shadow:"#ffffff20"
  },
}