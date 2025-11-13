const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus-visible:outline-blue-400',
  secondary:
    'bg-gray-800 text-white hover:bg-gray-900 focus-visible:outline-gray-400',
  ghost:
    'bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:outline-gray-300',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-400',
  success:
    'bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:outline-emerald-400'
};

const sizes = {
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-6 py-4 text-lg'
};

const Button = ({ variant = 'primary', size = 'md', className = '', ...props }) => {
  const variantClasses = variants[variant] ?? variants.primary;
  const sizeClasses = sizes[size] ?? sizes.md;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()}
      {...props}
    />
  );
};

export default Button;
