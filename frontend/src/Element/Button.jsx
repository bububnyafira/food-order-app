/* eslint-disable react/prop-types */
const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  size = "md",
  variant = "primary",
  disabled = false,
  fullWidth = false,
}) => {

  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-blue-400 hover:bg-blue-500",
    danger: "bg-red-500 hover:bg-red-600",
    success: "bg-green-500 hover:bg-green-600",
  };

  return (
    <button
      className={`btn transition duration-300 transform hover:scale-105 text-white rounded-xl 
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : " "} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
