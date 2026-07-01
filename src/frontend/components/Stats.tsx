import React from 'react';

interface StatItem {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

interface StatsProps {
  items: StatItem[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

const Stats = React.forwardRef<HTMLDivElement, StatsProps>(
  ({ items, className = '', columns = 4 }, ref) => {
    const columnClass = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    };

    return (
      <div
        ref={ref}
        className={`
          grid gap-6
          ${columnClass[columns]}
          md:grid-cols-2
          lg:${columnClass[columns]}
          ${className}
        `}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="
              bg-white rounded-lg p-6 border border-neutral-200
              hover:shadow-lg transition-all duration-300
            "
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {item.icon && <div className="mb-3 text-2xl">{item.icon}</div>}
                <p className="text-neutral-600 text-small mb-2">{item.label}</p>
                <p className="text-h3 font-bold text-neutral-900">{item.value}</p>
                {item.change && (
                  <p
                    className={`
                      text-small mt-2
                      ${
                        item.changeType === 'positive'
                          ? 'text-primary-600'
                          : item.changeType === 'negative'
                            ? 'text-red-600'
                            : 'text-neutral-600'
                      }
                    `}
                  >
                    {item.changeType === 'positive' && '↑'} {item.change}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

Stats.displayName = 'Stats';

export default Stats;
