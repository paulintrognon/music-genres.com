const Loader: React.FC = () => {
  return (
    <svg version="1.1" viewBox="0 0 52 12" width="52" height="12">
      <circle fill="#fff" stroke="none" cx="6" cy="6" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        ></animate>
      </circle>
      <circle fill="#fff" stroke="none" cx="26" cy="6" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        ></animate>
      </circle>
      <circle fill="#fff" stroke="none" cx="46" cy="6" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        ></animate>
      </circle>
    </svg>
  )
}
export default Loader
