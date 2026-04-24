"use client";

import { useRef } from "react";
import { CalendarDays } from "lucide-react";

type FocusColor = "blue" | "pink" | "cyan" | "purple" | "green" | "orange";

const FOCUS_RING: Record<FocusColor, string> = {
  blue:   "focus:ring-blue-500",
  pink:   "focus:ring-pink-500",
  cyan:   "focus:ring-cyan-500",
  purple: "focus:ring-purple-500",
  green:  "focus:ring-green-500",
  orange: "focus:ring-orange-500",
};

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  id?: string;
  className?: string;
  focusColor?: FocusColor;
}

export default function DateInput({
  value,
  onChange,
  min,
  max,
  id,
  className = "",
  focusColor = "blue",
}: DateInputProps) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 4) formatted = digits.slice(0, 4) + "-" + digits.slice(4);
    if (digits.length > 6) formatted = digits.slice(0, 4) + "-" + digits.slice(4, 6) + "-" + digits.slice(6);
    onChange(formatted);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const nav = ["Backspace", "Delete", "Tab", "Escape", "Enter",
                 "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
    if (nav.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  }

  function openPicker() {
    try { hiddenRef.current?.showPicker(); } catch { /* 지원 안 하는 브라우저 무시 */ }
  }

  const ringClass = FOCUS_RING[focusColor];

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        placeholder="YYYY-MM-DD"
        maxLength={10}
        inputMode="numeric"
        className={`w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 ${ringClass} ${className}`}
      />
      <button
        type="button"
        onClick={openPicker}
        tabIndex={-1}
        aria-label="달력으로 날짜 선택"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <CalendarDays size={16} />
      </button>
      {/* 네이티브 날짜 피커 트리거용 숨김 input */}
      <input
        ref={hiddenRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
