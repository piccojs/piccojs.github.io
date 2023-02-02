//caches fetches and depends on stale data, used mainly for imports and icons
app.cache=async function(url){
  url=new URL(url,app.src).href
  if(url in sessionStorage)return sessionStorage[url]
  let res = await app.fetch(url)
  if(res.error)return await app.cache(url)
  if(res.ok){
    sessionStorage[url]=res.text
    return res.text
  }
  return ""
  
}