{users
  .filter((user) => {
    const first = user.firstName?.toLowerCase() || '';
    const last = user.lastName?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
    return first.includes(term) || last.includes(term);
  })
  .map((user) => (
    <tr key={user._id} className="border-t">
      <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2 capitalize">{user.role}</td>
      <td className="px-4 py-2">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => {
            setSelectedUser(user);
            setConfirmOpen(true);
          }}
          className={`px-3 py-1 rounded text-white ${
            user.role === 'admin'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
        </button>
      </td>
    </tr>
  ))}

}

