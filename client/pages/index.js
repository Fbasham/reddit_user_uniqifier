import { useState } from 'react'
import Card from '../components/Card'
import Head from 'next/head'
import {BiUpvote,BiDownvote} from 'react-icons/bi'

export default function Home() {
  let [user,setUser] = useState('')
  let [data,setData] = useState([])
  let [isLoading,setIsLoading] = useState(false)
  let [btnDateSortAsc,setBtnDateSortAsc] = useState(false)
  let [btnVoteSortAsc,setBtnVoteSortAsc] = useState(false)

  async function getData(user){
    if (user){
      setIsLoading(true)
      setData(await (await fetch(`http://localhost:3434/${user}`)).json())
      setIsLoading(false)
    }
  }

  function sortBy(key,state,fn){
    fn(!state)
    setData([...data].sort((a,b)=>state ? a[key]-b[key] : b[key]-a[key]))
  }

  return (
    <>
      <Head>
        <title>Reddit Uniqifier</title>
      </Head>
      <div className='p-4'>
        <h1 className='mb-5 text-4xl text-slate-700'>Reddit Uniqifier</h1>
        <div className='flex flex-col justify-center gap-2 mb-5 md:flex-row md:items-center md:justify-start'>
          <label htmlFor='search'>Search Username:</label>
          <input onChange={e=>setUser(e.target.value)} className='px-2 py-1 border-2 rounded-md border-slate-700' id="search" placeholder="Enter a username"></input>
          <button onClick={()=>getData(user)} className='px-2 py-1 text-white border-2 rounded-md bg-slate-600 hover:bg-slate-700 border-slate-800'>Search</button>
        </div>
        {data.length>0 && <div className='flex justify-center gap-2 mb-3'>
          <button className='flex items-center gap-2 px-2 py-1 text-white border-2 rounded-md bg-slate-600 hover:bg-slate-700 border-slate-800' onClick={()=>sortBy('ups',btnVoteSortAsc,setBtnVoteSortAsc)}><i>{btnVoteSortAsc ? <BiDownvote /> : <BiUpvote />}</i><span>Sort by Vote</span></button>
          <button className='flex items-center gap-2 px-2 py-1 text-white border-2 rounded-md bg-slate-600 hover:bg-slate-700 border-slate-800' onClick={()=>sortBy('createdTime',btnDateSortAsc,setBtnDateSortAsc)}><i>{btnDateSortAsc ? <BiDownvote /> : <BiUpvote />}</i><span>Sort by Date</span></button>
        </div>}
        {isLoading && <p>Fetching results...</p>}
        {!isLoading && data.length>0 && <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
          {data.map(props=><Card key={props.id} props={props}/>)}
        </div>}
      </div>
    </>
  )
}
