<ul
  className={`${
    menuOpen ? 'flex' : 'hidden'
  } flex-col md:flex md:flex-row md:gap-6 gap-4 absolute md:static top-full left-0 w-full bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-0 p-6 md:p-0 z-40 text-center md:text-left`}
>
  {navigation.map((item, index) => (
    <li key={item.name}>
      <NavLink
        to={item.href}
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `text-xl font-semibold transition duration-300 ${
            isActive ? 'text-green-800' : 'text-gray-800 md:text-white'
          }`
        }
      >
        {item.name}
      </NavLink>
    </li>
  ))}
</ul>
