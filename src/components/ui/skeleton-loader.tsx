
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from '@/components/ThemeProvider';

interface SkeletonLoaderProps {
  height?: number | string;
  width?: number | string;
  count?: number;
  circle?: boolean;
  className?: string;
}

const SkeletonLoader = ({ height, width, count, circle, className }: SkeletonLoaderProps) => {
  const { isDark } = useTheme();

  return (
    <SkeletonTheme
      baseColor={isDark ? '#374151' : '#f3f4f6'}
      highlightColor={isDark ? '#4b5563' : '#e5e7eb'}
    >
      <Skeleton
        height={height}
        width={width}
        count={count}
        circle={circle}
        className={className}
      />
    </SkeletonTheme>
  );
};

export const ChartSkeleton = () => (
  <div className="space-y-4">
    <SkeletonLoader height={40} width="60%" />
    <SkeletonLoader height={300} />
    <div className="flex space-x-4">
      <SkeletonLoader height={20} width="25%" />
      <SkeletonLoader height={20} width="25%" />
      <SkeletonLoader height={20} width="25%" />
    </div>
  </div>
);

export const InsightCardSkeleton = () => (
  <div className="space-y-4 p-6">
    <div className="flex items-center space-x-2">
      <SkeletonLoader circle height={20} width={20} />
      <SkeletonLoader height={20} width="40%" />
    </div>
    <SkeletonLoader height={60} />
    <div className="flex space-x-2">
      <SkeletonLoader height={30} width={80} />
      <SkeletonLoader height={30} width={100} />
    </div>
  </div>
);

export default SkeletonLoader;
