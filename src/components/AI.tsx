import { useEffect, useRef, useState, type ReactNode } from "react";
import "./../styles/ai.css";

export interface ChatBubbleProps {
  variant?: "user" | "assistant";
  time?: string;
  children: ReactNode;
}

export function ChatBubble({ variant = "assistant", time, children }: ChatBubbleProps) {
  return (
    <div className={`vb-chat__bubble vb-chat__bubble--${variant}`}>
      {children}
      {time && <span className="vb-chat__time">{time}</span>}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="vb-typing" aria-label="Assistant is typing">
      <span className="vb-typing__dot" />
      <span className="vb-typing__dot" />
      <span className="vb-typing__dot" />
    </div>
  );
}

export interface ChatProps {
  children: ReactNode;
}

export function Chat({ children }: ChatProps) {
  return <div className="vb-chat">{children}</div>;
}

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
}

export function OTPInput({ length = 6, value, onChange, onComplete }: OTPInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value.length === length) onComplete?.(value);
  }, [value, length, onComplete]);

  const setChar = (index: number, char: string) => {
    const chars = value.padEnd(length, " ").split("");
    chars[index] = char || " ";
    const next = chars.join("").trimEnd().replaceAll(" ", "");
    onChange(next);
    if (char && index < length - 1) refs.current[index + 1]?.focus();
  };

  return (
    <div className="vb-otp" role="group" aria-label="One-time code">
      {Array.from({ length }, (_, i) => {
        const char = value[i] ?? "";
        return (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`vb-otp__box ${char ? "vb-otp__box--filled" : ""}`}
            value={char}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => setChar(i, e.target.value.replace(/\D/g, "").slice(-1))}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                e.preventDefault();
                const chars = value.split("");
                if (char) {
                  onChange(value.slice(0, i) + value.slice(i + 1));
                } else if (i > 0) {
                  onChange(value.slice(0, i - 1) + value.slice(i));
                  refs.current[i - 1]?.focus();
                } else {
                  onChange(chars.slice(0, -1).join(""));
                }
              }
            }}
            onFocus={(e) => e.target.select()}
          />
        );
      })}
    </div>
  );
}

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ tags, onChange, placeholder = "Add a tag..." }: TagInputProps) {
  const [draft, setDraft] = useState("");
  const commit = () => {
    const tag = draft.trim();
    if (tag && !tags.includes(tag)) onChange([...tags, tag]);
    setDraft("");
  };
  return (
    <div className="vb-taginput" onClick={(e) => e.currentTarget.querySelector("input")?.focus()}>
      {tags.map((tag) => (
        <span key={tag} className="vb-chip vb-chip--accent">
          {tag}
          <button
            className="vb-chip__remove"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            aria-label={`Remove ${tag}`}
          >
            ✕
          </button>
        </span>
        ))}
      <input
        value={draft}
        placeholder={tags.length === 0 ? placeholder : ""}
        aria-label="Add tag"
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit();
          } else if (e.key === "Backspace" && !draft && tags.length) {
            onChange(tags.slice(0, -1));
          }
        }}
        onBlur={commit}
      />
    </div>
  );
}

export interface FileUploadProps {
  onFiles?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  title?: string;
  hint?: string;
}

export function FileUpload({ onFiles, accept, multiple = true, title = "Drop files here", hint = "or click to browse" }: FileUploadProps) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`vb-upload ${over ? "vb-upload--over" : ""}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        onFiles?.(e.dataTransfer.files);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      aria-label={title}
    >
      <span className="vb-upload__icon">⇪</span>
      <span className="vb-upload__title">{title}</span>
      <span className="vb-upload__hint">{hint}</span>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => onFiles?.(e.target.files)}
      />
    </div>
  );
}

export interface Command {
  label: string;
  icon?: ReactNode;
  hint?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands?: Command[];
  placeholder?: string;
}

export function CommandPalette({ open, onClose, commands = [], placeholder = "Type a command..." }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  if (!open) return null;

  const run = (command?: Command) => {
    command?.onSelect?.();
    onClose();
  };

  return (
    <div className="vb-command" onClick={onClose}>
      <div
        className="vb-command__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="vb-command__input"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, matches.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter") {
              run(matches[active]);
            } else if (e.key === "Escape") {
              onClose();
            }
          }}
        />
        <div className="vb-command__list" role="listbox">
          {matches.length === 0 && <div className="vb-command__empty">No matching commands</div>}
          {matches.map((command, i) => (
            <button
              key={command.label}
              className={`vb-command__item ${i === active ? "vb-command__item--active" : ""}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => run(command)}
            >
              {command.icon && <span className="vb-command__icon">{command.icon}</span>}
              {command.label}
              {command.hint && <span className="vb-command__hint">{command.hint}</span>}
            </button>
          ))}
        </div>
        <div className="vb-command__footer">
          <span className="mono-label">↑↓ NAVIGATE</span>
          <span className="mono-label">↵ SELECT</span>
          <span className="mono-label">ESC CLOSE</span>
        </div>
      </div>
    </div>
  );
}
