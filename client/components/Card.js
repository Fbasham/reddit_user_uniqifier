import Image from 'next/image'
import {BiUpvote,BiDownvote} from 'react-icons/bi'


export default function Card({props}){
  let {url,createdTime,title,score,ups,downs,permalink} = props
  return (
    <div className='flex flex-col items-center justify-center p-2 pt-2 pb-4 text-white border-2 shadow-2xl bg-slate-700 rounded-xl border-slate-800'>
      <p className='mb-2 text-xl font-semibold text-center'>{title}</p>
      <div className='flex items-center gap-6 mb-4'>
        <span className='flex items-center gap-1 text-green-400'>
          <BiUpvote />
          <p>{ups}</p>
        </span>
        <span className='flex items-center gap-1 text-red-400'>
          <BiDownvote />
          <p>{downs}</p>
        </span>
      </div>
      <div className='relative w-64 mb-2 border-2 h-96 border-slate-800 rounded-xl hover:border-white focus-within:border-white'>
        <a href={'https://old.reddit.com'+permalink} target='_blank'>
          <Image src={url} objectFit='cover' layout='fill' className='rounded-xl'/>
        </a>
      </div>
      <p className='text-sm'>{new Date(createdTime*1000).toLocaleString('en-ca').split`,`[0]}</p>
    </div>
  )
}