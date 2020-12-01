type Props = React.ComponentProps<'svg'>
const MagnifyingGlassIcon: React.FC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="#fff"
      {...props}
    >
      <path d="M 19 3 C 13.488997 3 9 7.4889972 9 13 C 9 15.39499 9.8389508 17.588106 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.411894 22.161049 16.60501 23 19 23 C 24.511003 23 29 18.511003 29 13 C 29 7.4889972 24.511003 3 19 3 z M 19 5 C 23.430123 5 27 8.5698774 27 13 C 27 17.430123 23.430123 21 19 21 C 14.569877 21 11 17.430123 11 13 C 11 8.5698774 14.569877 5 19 5 z" />
    </svg>
  )
}
export default MagnifyingGlassIcon
