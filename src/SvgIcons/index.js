export function AppLogo ({ textColor, fontSize }){
  const svgStyle = {
    fontFamily: 'Arial, sans-serif',
  };

  const textProps = {
    fill: textColor || 'black', // Default text color is black
    fontSize: fontSize || 24,   // Default font size is 24
    fontWeight: "bold",
    fontStyle: "italic",
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" style={svgStyle}>
      <text x="10" y="30" {...textProps}>
        Sociosphere
      </text>
    </svg>
  );
}

export const HeartIcon = ({ filled }) => {
  // Define the styles for the heart icon
  const heartStyle = {
    fill: filled ? "red" : 'none',
    stroke: "red",
    strokeWidth: '2',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 100 100"
    >
      <path
        style={heartStyle}
        d="M50 89.6l-1.5-1.4C21.9 66.2 7 51.3 7 36c0-13.8 11.2-25 25-25 9 0 18.1 5.6 21 14.1C54.9 15.6 64 10 73 10c13.8 0 25 11.2 25 25 0 15.3-14.9 30.2-41.5 52.2l-1.5 1.4z"
      />
    </svg>
  );
};
