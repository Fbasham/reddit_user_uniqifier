import { useState } from 'react'
import Card from '../components/Card'

export default function Home() {
  let [user,setUser] = useState('')
  let [data,setData] = useState([])
  let [isLoading,setIsLoading] = useState(false)

  async function getData(user){
    if (user){
      setIsLoading(true)
      setData(await (await fetch(`http://localhost:3434/${user}`)).json())
      setIsLoading(false)
    }
  }

  function sortBy(key){
    setData([...data].sort((a,b)=>a[key]-b[key]))
  }

  return (
    <div className='p-4'>
      <h1 className='text-4xl text-slate-700 mb-5'>Reddit Uniqifier</h1>
      <div className='flex gap-2 flex-col justify-center md:flex-row md:items-center md:justify-start mb-5'>
        <label htmlFor='search'>Search Username:</label>
        <input onChange={e=>setUser(e.target.value)} className='px-2 py-1 border-2 border-slate-700 rounded-md' id="search" placeholder="Enter a username"></input>
        <button onClick={()=>getData(user)} className='bg-slate-600 text-white py-1 px-2 rounded-md hover:bg-slate-700 border-3 border-blue-400'>Search</button>
      </div>
      {data.length>0 && <div className='flex justify-center gap-2 mb-3'>
        <button className='bg-slate-600 text-white py-1 px-2 rounded-md hover:bg-slate-700 border-3 border-2 border-slate-800' onClick={()=>sortBy('ups')}>Sort by Date</button>
        <button className='bg-slate-600 text-white py-1 px-2 rounded-md hover:bg-slate-700 border-3 border-2 border-slate-800' onClick={()=>sortBy('createdTime')}>Sort by Votes</button>
      </div>}
      {isLoading && <p>Fetching results...</p>}
      {data.length>0 && <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
        {data.map((props,i)=><Card key={i} props={props}/>)}
      </div>}
    </div>
  )
}
