'use client';
import React, { useState } from 'react';

const HeavyComponent = ({ text }: { text: string }) => {
  console.log("✨ HeavyComponent 렌더링됨!");
  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', marginTop: '10px' }}>
      <p>{text}</p>
    </div>
  );
};

export default function CompilerTestPage() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const expensiveObject = {
    title: "컴파일러 테스트",
    description: "이 객체는 리렌더링 시 참조값이 유지되어야 합니다.",
    upperText: text.toUpperCase()
  };

  console.log("📱 부모 컴포넌트(Page) 렌더링됨!");

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Compiler Test</h1>
      
      <section>
        <h3>1. 상태 변경 (count: {count})</h3>
        <button onClick={() => setCount(c => c + 1)}>숫자 올리기</button>
      </section>

      <section>
        <h3>2. 텍스트 입력</h3>
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="이름을 입력하세요"
        />
        <p>현재 입력된 값: {expensiveObject.upperText}</p>
      </section>

      <HeavyComponent text="test" />
    </div>
  );
}