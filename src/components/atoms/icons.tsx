// src/components/atoms/icons.tsx

export function IconSearch({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        d="M21 21l-4.35-4.35" />
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconChevronDown({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

