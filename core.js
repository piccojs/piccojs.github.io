//construct app object, catch manifest values and add shortcut to lib src
const app={
  //used throughout to collect init data
  manifest:Object.assign({},...[...document.currentScript.attributes].map(e=>{return {[e.name]:e.value}})),
  //to access data in the scope of picco
  src:document.currentScript.src,
  
  //define components
  components:{},
  defineComponent(name,value){
  app.components[name.toUpperCase()]=value
  return app},
  
  //define attributes
  attributes:[],
  defineAttribute(setup={}){
  app.attributes.push(setup);return app},
  
  //picco variables
  variables:{},
  logStack:[],
  loadingScreen:"..."
}