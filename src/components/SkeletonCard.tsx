import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card glass-panel" aria-hidden="true">
      <div className="skeleton-image skeleton-shimmer" />
      <div className="skeleton-content">
        <div className="skeleton-badge skeleton-shimmer" />
        <div className="skeleton-title skeleton-shimmer" />
        <div className="skeleton-title skeleton-shimmer" style={{ width: '80%' }} />
        <div className="skeleton-text skeleton-shimmer" style={{ marginTop: '12px' }} />
        <div className="skeleton-text skeleton-shimmer" />
        <div className="skeleton-text-short skeleton-shimmer" />
        <div className="skeleton-footer">
          <div className="skeleton-meta skeleton-shimmer" />
          <div className="skeleton-meta skeleton-shimmer" style={{ width: '60px' }} />
        </div>
      </div>
    </div>
  );
};
