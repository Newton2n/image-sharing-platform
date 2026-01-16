import React from "react";
import SkeletonEffect from "@/components/ui/effects/skeleton-effect";
const Loading = () => {
  return <SkeletonEffect count={20} />;
};

export default Loading;
