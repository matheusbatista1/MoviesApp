interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  required?: boolean; 
  onChange: (value: string) => void;
}

const InputField = ({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  error,
  disabled,
  onChange,
}: InputFieldProps) => {
  const baseInputStyles = 'shadow appearance-none border rounded w-[342px] md:w-[380px] h-[44px] px-3 text-input-text placeholder-input-placeholder leading-tight focus:outline-none focus:shadow-outline bg-input-background caret-button-primary-default [color-scheme:dark]';
  
  const getTypeStyles = () => {
    if (type === 'date') {
      return '[&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.8] [&::-webkit-calendar-picker-indicator]:hover:brightness-[0.8] [&::-webkit-calendar-picker-indicator]:accent-color';
    }
    return '';
  };
  const borderStyles = error
    ? 'border-input-error focus:border-input-error'
    : 'border-input-outline-default focus:border-input-outline-focus';
  
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="block text-input-label text-xs font-bold mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseInputStyles} ${borderStyles} ${getTypeStyles()}`}
        autoComplete={type === 'password' ? 'current-password' : 'on'}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className="text-input-error text-xs mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
