import { forwardRef } from 'react';

function Root(props, ref) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8.5H14.5" stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6 16.5H8" stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10.5 16.5H14.5" stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M22 14.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H14.5"
        stroke="#fff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M20 3.5V9.5L22 7.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20 9.5L18 7.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}
const DashboardLoan = forwardRef(Root);
export default DashboardLoan;
