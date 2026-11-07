import React, { useState } from 'react';

interface ChartDataPoint {
  name: string;
  value1: number;
  value2?: number;
  target?: number;
}

interface SimpleChartProps {
  data: ChartDataPoint[];
  labels?: { series1: string; series2?: string };
  type?: 'area' | 'bar' | 'donut';
  height?: number;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({
  data,
  labels = { series1: 'Actual ($k)', series2: 'Optimized ($k)' },
  type = 'area',
  height = 200,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div className="h-40 flex items-center justify-center text-xs text-[#888888]">No chart telemetry available</div>;
  }

  // Find max value
  const allValues = data.flatMap(d => [d.value1, d.value2 || 0, d.target || 0]);
  const maxVal = Math.max(...allValues, 1) * 1.15;

  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;
  const width = 600;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index: number) => paddingLeft + (index / (data.length - 1 || 1)) * chartWidth;
  const getY = (val: number) => paddingTop + chartHeight - (val / maxVal) * chartHeight;

  if (type === 'bar') {
    const barWidth = Math.max(12, chartWidth / (data.length * 2.2));
    return (
      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* Horizontal gridlines */}
          {[0, 0.33, 0.66, 1].map((pct, idx) => {
            const y = paddingTop + chartHeight * (1 - pct);
            const val = Math.round(maxVal * pct);
            return (
              <g key={idx}>
                <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#1f1f1f" strokeDasharray="3 3" />
                <text x={paddingLeft - 6} y={y + 3} textAnchor="end" fill="#666666" fontSize="10" className="font-mono">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((item, idx) => {
            const x = getX(idx);
            const h1 = (item.value1 / maxVal) * chartHeight;
            const y1 = paddingTop + chartHeight - h1;

            const isHovered = hoverIndex === idx;

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                className="cursor-pointer"
              >
                <rect
                  x={x - barWidth / 2}
                  y={y1}
                  width={barWidth}
                  height={h1}
                  fill={isHovered ? '#60a5fa' : '#3b9eff'}
                  rx="3"
                  className="transition-colors duration-150"
                />
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  fill={isHovered ? '#ffffff' : '#888888'}
                  fontSize="11"
                  className="font-mono"
                >
                  {item.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-[#888888] pt-2 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#3b9eff]" />
            <span>{labels.series1}</span>
          </div>
          {hoverIndex !== null && (
            <span className="font-mono text-white">
              {data[hoverIndex].name}: <strong className="text-[#3b9eff]">{data[hoverIndex].value1}</strong>
            </span>
          )}
        </div>
      </div>
    );
  }

  // Area Chart
  const points1 = data.map((d, i) => `${getX(i)},${getY(d.value1)}`).join(' ');
  const area1 = `${points1} ${getX(data.length - 1)},${paddingTop + chartHeight} ${getX(0)},${paddingTop + chartHeight}`;

  const hasSeries2 = data.some(d => d.value2 !== undefined);
  const points2 = hasSeries2 ? data.map((d, i) => `${getX(i)},${getY(d.value2 || 0)}`).join(' ') : '';

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b9eff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b9eff" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines */}
        {[0, 0.33, 0.66, 1].map((pct, idx) => {
          const y = paddingTop + chartHeight * (1 - pct);
          const val = Math.round(maxVal * pct);
          return (
            <g key={idx}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#1f1f1f" strokeDasharray="3 3" />
              <text x={paddingLeft - 6} y={y + 3} textAnchor="end" fill="#666666" fontSize="10" className="font-mono">
                {val}
              </text>
            </g>
          );
        })}

        {/* Filled Area */}
        <polygon points={area1} fill="url(#gradient-area)" />

        {/* Series 2 (e.g. target or optimized) */}
        {hasSeries2 && (
          <polyline
            points={points2}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        )}

        {/* Primary Line */}
        <polyline
          points={points1}
          fill="none"
          stroke="#3b9eff"
          strokeWidth="2"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const x = getX(i);
          const y = getY(d.value1);
          const isHover = hoverIndex === i;

          return (
            <g
              key={i}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className="cursor-pointer"
            >
              <circle
                cx={x}
                cy={y}
                r={isHover ? 5 : 3.5}
                fill={isHover ? '#ffffff' : '#3b9eff'}
                stroke="#000000"
                strokeWidth="2"
                className="transition-all"
              />
              <text
                x={x}
                y={height - 8}
                textAnchor="middle"
                fill={isHover ? '#ffffff' : '#888888'}
                fontSize="10"
                className="font-mono"
              >
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend & Hover Info */}
      <div className="flex items-center justify-between text-xs text-[#888888] pt-2 px-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#3b9eff]" />
            <span>{labels.series1}</span>
          </div>
          {hasSeries2 && labels.series2 && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 border-t border-dashed border-emerald-400" />
              <span>{labels.series2}</span>
            </div>
          )}
        </div>

        {hoverIndex !== null && (
          <div className="font-mono text-xs text-white">
            {data[hoverIndex].name}: <span className="text-[#3b9eff] font-bold">{data[hoverIndex].value1}</span>
            {data[hoverIndex].value2 !== undefined && (
              <span className="text-emerald-400 ml-2">({data[hoverIndex].value2})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
