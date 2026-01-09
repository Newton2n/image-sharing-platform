import React from "react";
import SkeletonEffect from "@/components/ui/effects/SkeletonEffect";
const Loading = () => {
  return <SkeletonEffect count={20} />;
};

export default Loading;
