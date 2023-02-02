//set the theme color of element or body
app.defineAttribute({
  name:"theme",
  match:"*",
  parser(attr,value){
    if(value=="system"){
      
    } else {
      if(!(value in app.themes))return;
      this.style.setProperty("--text",app.themes[value].text)
      this.style.setProperty("--background",app.themes[value].background)
      this.style.setProperty("--foreground",app.themes[value].foreground)
      this.style.setProperty("--shadow",app.themes[value].shadow)
      
      this.style.backgroundColor="var(--background)";
      this.style.color="var(--text)"}
    
  }
})