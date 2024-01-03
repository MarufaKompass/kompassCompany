export default function Uppercase(string) {
  const capitalizedStatus =
    string && typeof string === 'string' && string.length > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  return capitalizedStatus;
}
