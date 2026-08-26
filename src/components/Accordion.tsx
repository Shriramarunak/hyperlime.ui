import { useState, type ReactNode } from "react";
import "./../styles/accordion.css";

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className="vb-accordion">
      {items.map((item, i) => (
        <div key={item.title} className="vb-accordion__item">
          <button
            className="vb-accordion__trigger"
            aria-expanded={open.has(i)}
            onClick={() => toggle(i)}
          >
            {item.title}
            <span className={`vb-accordion__icon ${open.has(i) ? "vb-accordion__icon--open" : ""}`}>
              +
            </span>
          </button>
          {open.has(i) && <div className="vb-accordion__content">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}
