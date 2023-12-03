import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <HashLoader className="text-black dark:text-white" />
    </div>
  );
};

export default Loading;
