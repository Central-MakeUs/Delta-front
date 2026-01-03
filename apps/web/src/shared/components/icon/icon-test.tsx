"use client";

import Icon from "@/shared/components/icon/icon";

export default function IconTest() {
  return (
    <div>
      <Icon name="home" color="#30323D" />
      <Icon name="home" fill="currentColor" color="#30323D" />
      <Icon name="chevron" color="#8E91A8" />
      <Icon name="chevron" rotate={90} />
      <Icon name="chevron" rotate={180} />
      <Icon name="chevron" rotate={270} />
    </div>
  );
}
