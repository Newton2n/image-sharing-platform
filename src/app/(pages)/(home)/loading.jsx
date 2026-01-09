import React from "react";
import SkeletonEffect from "@/components/ui/effects/SkeletonEffect";
const loading = () => {
  return <SkeletonEffect count={20} />;
};

export default loading;
