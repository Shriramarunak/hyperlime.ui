import { useState, type ReactNode } from "react";
import "./../styles/tabs.css";

export interface Tab {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  initial?: number;
}

export default function Tabs({ tabs, initial = 0 }: TabsProps) {
  const [active, setActive] = useState(initial);
  return (
    <div className="vb-tabs">
      <div className="vb-tabs__list" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={i === active}
            className={`vb-tabs__tab ${i === active ? "vb-tabs__tab--active" : ""}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="vb-tabs__panel" role="tabpanel">
        {tabs[active]?.content}
      </div>
    </div>
  );
}
