import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../index";

import service from "../../../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";
function EditPost() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const { postId } = useParams();
  
  useEffect(() => {
    if (postId) {
      service.getPost(postId).then((post) =>setPost(post));
    
      navigate(`/edit-post/${postId}`)
    } else {
     
      navigate("/");
    }
  }, [ postId,navigate]);

  return <div className="w-full py-8">
     <Container>
      <PostForm post ={post}/>
     </Container>
  </div>;
}

export default EditPost;
