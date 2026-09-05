import React from "react";

const Row = ({ description, children, className = "" }) => {
  return (
    <div className={`flex-1 border font-roboto border-black-2 p-2 ${className}`}>
      {children}
      {description !== "" ? (
        <p className="text-black font-medium">{description}</p>
      ) : null}
    </div>
  );
};

export default Row;
