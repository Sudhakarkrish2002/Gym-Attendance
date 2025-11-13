const Input = ({
  label,
  id,
  className = '',
  labelClassName = '',
  ...props
}) => (
  <label htmlFor={id} className={`block text-sm font-semibold text-gray-700 ${labelClassName}`.trim()}>
    {label && <span className="mb-2 block">{label}</span>}
    <input
      id={id}
      className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-gray-900 bg-white placeholder:text-gray-500 ${className}`.trim()}
      {...props}
    />
  </label>
);

export default Input;
