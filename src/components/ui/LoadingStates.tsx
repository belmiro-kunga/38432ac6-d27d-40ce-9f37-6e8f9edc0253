import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

// Skeleton Loader Básico
export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-air-gray/30",
      className
    )}
  />
);

// Skeleton para Cards
export const CardSkeleton = () => (
  <div className="rounded-xl p-6 space-y-4 bg-white shadow-lg">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-24 w-full" />
    <div className="flex space-x-2">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-16" />
    </div>
  </div>
);

// Skeleton para Hero Section
export const HeroSkeleton = () => (
  <div className="h-screen relative bg-air-gray/20">
    <div className="absolute inset-0 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

// Loading Spinner Avançado
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'dark';
}

export const LoadingSpinner = ({ size = 'md', color = 'primary' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'border-air-red',
    white: 'border-white',
    dark: 'border-air-black'
  };

  return (
    <div className={cn(
      "animate-spin rounded-full border-2 border-transparent border-t-current",
      sizeClasses[size],
      colorClasses[color]
    )} />
  );
};

// Loading Overlay
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const LoadingOverlay = ({ isLoading, children }: LoadingOverlayProps) => (
  <div className="relative">
    {children}
    {isLoading && (
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-air-gray-dark font-medium">Carregando...</p>
        </div>
      </div>
    )}
  </div>
);

// Progress Bar
interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar = ({ progress, className }: ProgressBarProps) => (
  <div className={cn("w-full bg-air-gray/20 rounded-full h-2", className)}>
    <div 
      className="bg-gradient-to-r from-air-red to-red-600 h-2 rounded-full transition-all duration-300 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    />
  </div>
);