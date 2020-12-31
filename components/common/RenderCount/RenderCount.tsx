import React, { useRef } from "react";

function RenderCount() {
  const count = useRef(0);
  return (
    <div>
      <h2>Render Count: {++count.current}</h2>
    </div>
  );
}

export default RenderCount;
