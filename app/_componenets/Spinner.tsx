interface LoadingSpinnerProps {
  className?: string;
}

export const Spinner: React.FC<LoadingSpinnerProps> = ({
  className,
}) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 ${className}`}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  </div>
);
