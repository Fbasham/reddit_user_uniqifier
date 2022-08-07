import Image from 'next/image'
import {BiUpvote,BiDownvote} from 'react-icons/bi'


export default function Card({props}){
  let {url,createdTime,title,score,ups,downs,permalink} = props
  return (
    <div className='flex flex-col justify-center items-center bg-slate-700 rounded-xl p-2 pt-2 pb-4 text-white shadow-2xl border-4 border-slate-800'>
      <p className='text-xl text-center mb-2'>{title}</p>
      <div className='flex items-center gap-6 mb-2'>
        <span className='flex items-center text-green-400 gap-1'>
          <BiUpvote />
          <p>{ups}</p>
        </span>
        <span className='flex items-center text-red-400 gap-1'>
          <BiDownvote />
          <p>{downs}</p>
        </span>
      </div>
      <div className='relative h-96 w-64 border-2 border-slate-800 rounded-xl hover:border-white focus-within:border-white'>
        <a href={'https://old.reddit.com'+permalink} className='' target='_blank'>
          <Image src={url} objectFit='cover' layout='fill' className='rounded-xl'/>
        </a>
      </div>
      <p className='text-sm'>{new Date(createdTime*1000).toLocaleString('en-ca').split`,`[0]}</p>
    </div>
  )
}