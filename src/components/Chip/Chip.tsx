import React from 'react';

type ChipColor = 'gray' | 'blue' | 'green' | 'red' | 'amber' | 'purple';
type ChipVariant = 'solid' | 'soft' | 'outline';
type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
  leadingIcon?: React.ReactNode; // e.g. <Star className="w-3 h-3" />
  avatarUrl?: string; // round avatar at start
  onRemove?: () => void; // show close button if provided
  asButton?: boolean; // render focus/hover as interactive
  selected?: boolean; // for filter chips
  disabled?: boolean;
}

const sizeClasses: Record<ChipSize, string> = {
  sm: 'text-xs h-6 px-2 gap-1',
  md: 'text-sm h-8 px-3 gap-1.5',
  lg: 'text-sm h-9 px-3.5 gap-2',
};

const base =
  'inline-flex items-center rounded-full border transition-colors select-none' +
  ' focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const palette = {
  gray: {
    solid: 'bg-gray-900 text-white border-transparent hover:bg-gray-800',
    soft: 'bg-gray-100 text-gray-800 border-transparent hover:bg-gray-200',
    outline: 'bg-transparent text-gray-800 border-gray-300 hover:bg-gray-50',
  },
  blue: {
    solid: 'bg-blue-600 text-white border-transparent hover:bg-blue-700',
    soft: 'bg-blue-50 text-blue-700 border-transparent hover:bg-blue-100',
    outline: 'bg-transparent text-blue-700 border-blue-300 hover:bg-blue-50',
  },
  green: {
    solid: 'bg-green-600 text-white border-transparent hover:bg-green-700',
    soft: 'bg-green-50 text-green-700 border-transparent hover:bg-green-100',
    outline: 'bg-transparent text-green-700 border-green-300 hover:bg-green-50',
  },
  red: {
    solid: 'bg-red-600 text-white border-transparent hover:bg-red-700',
    soft: 'bg-red-50 text-red-700 border-transparent hover:bg-red-100',
    outline: 'bg-transparent text-red-700 border-red-300 hover:bg-red-50',
  },
  amber: {
    solid: 'bg-amber-500 text-white border-transparent hover:bg-amber-600',
    soft: 'bg-amber-50 text-amber-800 border-transparent hover:bg-amber-100',
    outline: 'bg-transparent text-amber-800 border-amber-300 hover:bg-amber-50',
  },
  purple: {
    solid: 'bg-purple-600 text-white border-transparent hover:bg-purple-700',
    soft: 'bg-purple-50 text-purple-700 border-transparent hover:bg-purple-100',
    outline:
      'bg-transparent text-purple-700 border-purple-300 hover:bg-purple-50',
  },
};

export const Chip: React.FC<ChipProps> = ({
  children,
  color = 'gray',
  variant = 'soft',
  size = 'md',
  leadingIcon,
  avatarUrl,
  onRemove,
  asButton = false,
  selected = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  const cls = [
    base,
    sizeClasses[size],
    palette[color][variant],
    disabled
      ? 'opacity-50 cursor-not-allowed'
      : asButton
      ? 'cursor-pointer'
      : '',
    selected && variant !== 'solid' ? 'ring-2 ring-current/30' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt=""
          className="w-4 h-4 rounded-full object-cover"
        />
      )}
      {leadingIcon && <span className="[&>*]:align-middle">{leadingIcon}</span>}
      <span className="truncate">{children}</span>

      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full hover:bg-black/10 focus:outline-none"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </>
  );

  // Render as div or button for better accessibility when clickable
  if (asButton) {
    return (
      <div
        // type="button"
        className={cls}
        aria-pressed={selected}
        // disabled={disabled}
        {...rest}
      >
        {content}
      </div>
    );
  }

  return (
    <div role="note" aria-disabled={disabled} className={cls} {...rest}>
      {content}
    </div>
  );
};
