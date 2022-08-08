const axios = require('axios')
const getToken = require('./getToken')

async function searchRedditUser(user){
  const URL = `https://oauth.reddit.com/u/${user}`
  let headers = {Authorization: `bearer ${await getToken()}`}
  let params = {limit: 100}
  let seenUrls = new Set()
  let uploadTimes = []
  let results = []
  for (let i=0;i<1;i++){
    try {
      let { children } = await axios.get(URL,{headers,params}).then(res=>res.data.data)
      params = {...params, after: children[children.length-1].data.name}
      children
        .filter(e=>e.kind==='t3' && !e.data.num_crossposts && e.data.post_hint==='image')
        .forEach(e=>{
          let url = e.data.url_overridden_by_dest || e.data.url
          let createdTime = e.data.created_utc
          if (!seenUrls.has(url) && uploadTimes.every(t=>Math.abs(t-createdTime)>30000)){
            seenUrls.add(url)
            uploadTimes.push(createdTime)
            results.push({
              url,
              createdTime,
              id: e.data.id,
              title: e.data.title,
              score: e.data.score,
              permalink: e.data.permalink,
              ups: e.data.ups,
              downs: e.data.downs
            })
          }
        })
    }
    catch (e){
      break
    }
  }
  return results
}

module.exports = searchRedditUser