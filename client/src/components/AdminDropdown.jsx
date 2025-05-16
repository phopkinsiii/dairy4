// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDropdown = ({scrolled}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`text-2xl font-semibold px-4 py-2 transition-colors duration-300 ${
          scrolled
            ? 'text-stone-800 hover:text-stone-950'
            : 'text-white hover:text-yellow-200'
        }`}
      >
        Admin
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <ul className="py-1 text-base font-poppins text-gray-800">
            <li>
              <Link
                to="/add-product"
                className="block px-4 py-2 hover:bg-indigo-100"
              >
                Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/add-blog"
                className="block px-4 py-2 hover:bg-indigo-100"
              >
                Add Blog Post
              </Link>
            </li>
            <li>
              <Link
                to="/manage-products"
                className="block px-4 py-2 hover:bg-indigo-100"
              >
                Manage Products
              </Link>
            </li>
            <li>
              <Link
                to="/manage-posts"
                className="block px-4 py-2 hover:bg-indigo-100"
              >
                Manage Blog Posts
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDropdown;
