import { useState } from "react";
import "./../styles/tabs.css";

export default function Tabs({ tabs, initial = 0 }) {
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
