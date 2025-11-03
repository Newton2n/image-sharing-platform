import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import service from '../../appwrite/config'
 function  PostCard({$id,title,featuredImg}) {
  const [imgUrl,setImgUrl] =useState();
  useEffect(()=>{
   service.fileView(featuredImg).then((url)=> setImgUrl(url))
  
  },[])

  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-white rounded-3xl p-0.5 flex-col flex items-center '>
    <div className='w-full mb-2'>
               <img src={imgUrl}  className='rounded-2xl shadow-md

'/>

            </div>
            <h2  className='text-[13px] font-bold pb-1'>{title} </h2>
    </div>
    </Link>
  )
}

export default PostCard