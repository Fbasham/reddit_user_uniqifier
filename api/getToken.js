const axios = require('axios')

async function getToken(){
  let { data } = await axios.post(
    'https://www.reddit.com/api/v1/access_token',
    new URLSearchParams(
      {
        'username': process.env.REDDIT_USERNAME,
        'password': process.env.REDDIT_PASSWORD,
        'grant_type': 'password'
      }
    ),
    {
      auth: {
        username: process.env.CLIENTID,
        password: process.env.SECRET
      }
    }
  )
  return await data['access_token']
}

module.exports = getToken