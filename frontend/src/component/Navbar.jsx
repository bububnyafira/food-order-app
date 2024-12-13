/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../Element/Button";

const Navbar = ({ cart, totalPrice }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <div className="navbar bg-base-100 shadow-lg rounded-b-badge">
      <div className="flex-1 flex justify-start">
        <a className="btn btn-ghost text-xl rounded-badge">daisyUI</a>
      </div>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered flex justify-center rounded-full h-10 w-24 md:w-auto"
        />
      </div>
      <div className="flex-1 flex justify-end">
        <div className="dropdown dropdown-end" onBlur={closeDropdown}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={toggleDropdown}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div className="card-body">
                <span className="text-lg font-bold">
                  {cart.reduce((sum, item) => sum + item.qty, 0)} Items
                </span>
                <span className="text-info">Subtotal: Rp {totalPrice.toLocaleString()}</span>
                <div className="card-actions justify-center">
                  <Button
                    variant="success"
                    size="sm"
                    fullWidth
                    onClick={() => console.log("Clicked!")}
                  >
                    View Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
