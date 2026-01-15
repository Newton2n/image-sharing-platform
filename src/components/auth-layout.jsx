"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
function Protected({ children ,authentication =true}) {
  const authStatus = useSelector((state) => state.auth.activeStatus);
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
 
  
        if(authentication && authStatus !== authentication){
            router.replace("/login")
        } else if(!authentication && authStatus !== authentication){
            router.replace("/")
        }
        setLoading(false)
    

   }
  , [authStatus,  authentication]);

  return loading ? <div>Loading Data</div> : <>{children}</>;
}

export default Protected;
