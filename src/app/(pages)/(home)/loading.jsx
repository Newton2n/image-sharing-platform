import React from "react";
import SkeletonEffect from "@/components/ui/SkeletonEffect";
const loading = () => {
  return <SkeletonEffect count={20} />;
};

export default loading;
