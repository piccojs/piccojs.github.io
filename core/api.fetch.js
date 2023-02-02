//creates a fetch request
//TODO: cache fetch request to indexdb with custom cache controls 
app.fetch=function Fetch(url="",opts={}){
  //opts = base:string(url base if is relative url), method:string(fetch method) default "GET",
  return new Promise((res)=>{
    //using xml over fetch bacause of simple error caching.
    let request=new XMLHttpRequest()
    request.open(opts.method||"GET",new URL(url,opts.base||location.href).href)
    //arraybuffers can be converted to all other response types, preffered.
    request.responseType = "arraybuffer";
    //when fetch completes and response is returned
    request.addEventListener("load",async event=>{
      //collect different response types and important data
      let resp={}
      resp.buffer=request.response
      resp.text=await new Blob([resp.buffer]).text()
      try{resp.json=JSON.parse(resp.text)}catch(e){}
      resp.url=request.responseURL
      resp.status=request.status
      resp.statusText=request.statusText
      resp.ok=resp.status>199&&resp.status<300
      resp.request=request
      res(resp)
    })
    //usually server or network error
    request.addEventListener("error",event=>{
      res({status:0,error:"failed to fetch",url,request})
    })
    
    //send request with body
    request.send(opts.body||null)
  })
}
