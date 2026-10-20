interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  hover?: boolean;
}

/**
 * Dark glass card with a 1px gold border.
 * Pass hover=true to enable the gold-glow lift on hover.
 */
export function Card({ children, className = '', as: Tag = 'div', hover = true }: CardProps) {
  return (
    <Tag
      className={[
        'relative rounded-sm bg-bg-elevated border border-border-gold/40 p-6',
        hover ? 'card-gold-hover' : '',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  );
}
