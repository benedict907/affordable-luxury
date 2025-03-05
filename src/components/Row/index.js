import React from "react";

const Row = ({
  description,
  isDate = false,
  showBorder = true,
  children,
  style,
}) => {
  return (
    <div className={`flex-1 border border-black-2 p-2 ${style}`}>
      {children}
      <p>{description}</p>
    </div>
  );
};

export default Row;
// return (
//   <div
//     className={`flex-1 ${
//       isDate && showBorder
//         ? " border-t border-r border-black-2"
//         : isDate && !showBorder
//         ? null
//         : "border border-black-2"
//     }  p-2 ${style}`}
//   >
//     {children}
//     <p>{description}</p>
//   </div>
// );
