//syntactic sugar to interact with the element styling and default attribute

//set element id e.g. #my-buttonb #button3
//ids set with # are pushed to global
app.defineAttribute({name:"#",match:"*",parser(attr){this.removeAttribute(attr);this.id=attr.slice(1); window[this.id]=this}})

//set element classes e.g. .blue .alert.warning ...
//classes can be bound but are still parsed as seperate
app.defineAttribute({ name:".",match:"*", parser(attr){this.removeAttribute(attr);this.classList.add(...attr.split(".").filter(e=>e))}})

//set induvidual styling e.g. -color=blue -z-index=4
//also sets css variables
app.defineAttribute({ name:"-",match:"*",parser(attr,value){ this.removeAttribute(attr);if(attr.startsWith("--"))this.style.setProperty(attr,value);else this.style[attr.slice(1)]=app.stylar(value,this)}})