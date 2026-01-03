"use client"
import { useState } from "react";

const TestComponent = () => {
    console.log("ChildComponent rendered");
    return <div>TestComponent</div>;
  }

const TestPage = () => {
    // "use no memo"
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Button clicked");
    setCount(count + 1);
  };

  console.log("ParentComponent rendered");

  return (
    <>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
      </div>
      <TestComponent />
    </>
  );
}

export default TestPage;