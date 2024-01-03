import { forwardRef } from 'react';

function Root(props, ref) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.8899 3L9.11989 3C6.99989 3 6.99989 3 5.64989 5L2.46989 10.5C1.98989 11.33 1.98989 12.68 2.46989 13.5L5.64989 19C6.99989 21 6.99989 21 9.10989 21L14.8899 21C16.9999 21 16.9999 21 18.3499 19L21.5299 13.5C22.0099 12.68 22.0099 11.33 21.5299 10.5L18.3499 5C16.9999 3 16.9999 3 14.8899 3Z"
        stroke="#707070"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"
        stroke="#707070"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
const Settings = forwardRef(Root);
export default Settings;
