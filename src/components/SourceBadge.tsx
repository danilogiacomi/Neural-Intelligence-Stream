import React from 'react';
import { SOURCES } from '../utils/constants';

interface SourceBadgeProps {
  sourceId: string;
  sourceName: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ sourceId, sourceName }) => {
  const source = SOURCES.find(s => s.id === sourceId);
  const color = source?.iconColor || 'oklch(60% 0.1 250)'; // fallback color

  return (
    <span
      className="source-badge"
      style={{
        backgroundColor: color,
      }}
    >
      {sourceName}
    </span>
  );
};
