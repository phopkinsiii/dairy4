// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const dropdownLinks = [
  { label: 'Add Product', path: '/add-product' },
  { label: 'Add Blog Post', path: '/add-blog' },
  { label: 'Manage Products', path: '/manage-products' },
  { label: 'Manage Blog Posts', path: '/manage-posts' },
  { label: 'Update Inventory', path: '/inventory' },
   { label: 'View Orders', path: '/admin-orders' },
   { label: 'Manage Users', path: '/admin/users' },
];


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
          {dropdownLinks.map((link) => (
  <li key={link.path}>
    <Link
      to={link.path}
      onClick={() => setOpen(false)}
      className="block px-4 py-2 hover:bg-indigo-100"
    >
      {link.label}
    </Link>
  </li>
))}

          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDropdown;
