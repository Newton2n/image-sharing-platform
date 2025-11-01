import { useEffect, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Protected({ children ,authentication =true}) {
  const authStatus = useSelector((state) => state.auth.activeStatus);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  //   if(authentication ===false){
  //    navigate()
  //   }else if(authentication===true &&authStatus===false){
  //     navigate("/login")
  //   }else if(authentication ===true && authStatus ===true){
  //     navigate(slug)
  //   }
  //   setLoading(false);
  //
  
        if(authentication && authStatus !== authentication){
            navigate("/login",{replace:true})
        } else if(!authentication && authStatus !== authentication){
            navigate("/",{replace:true})
        }
        setLoading(false)
    

   }
  , [authStatus,  authentication]);

  return loading ? <div>Loading Data</div> : <>{children}</>;
}

export default Protected;
