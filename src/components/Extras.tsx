import { useState, type ReactNode } from "react";
import "./../styles/extras.css";

export interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
}

export function Rating({ value = 0, onChange, max = 5 }: RatingProps) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="vb-rating" role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          className={`vb-rating__star ${star <= shown ? "vb-rating__star--filled" : ""}`}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${star} of ${max}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export interface StepperProps {
  steps: string[];
  current?: number;
}

export function Stepper({ steps, current = 0 }: StepperProps) {
  return (
    <div className="vb-stepper">
      {steps.map((label, i) => (
        <div
          key={label}
          className={`vb-stepper__step ${i < current ? "vb-stepper__step--done" : ""} ${i === current ? "vb-stepper__step--current" : ""}`}
        >
          <span className="vb-stepper__line" />
          <span className="vb-stepper__dot">{i < current ? "✓" : i + 1}</span>
          <span className="vb-stepper__label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = "◇", title, description, action }: EmptyStateProps) {
  return (
    <div className="vb-empty">
      <span className="vb-empty__icon">{icon}</span>
      <span className="vb-empty__title">{title}</span>
      {description && <p className="vb-empty__description">{description}</p>}
      {action}
    </div>
  );
}
