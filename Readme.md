<div className="flex justify-between items-center mt-6">
  <button
    type="button"
    onClick={() => dispatch({ type: 'RESET_FORM' })}
    className="text-sm text-gray-500 hover:text-gray-700 underline"
  >
    Clear Form
  </button>

  <button
    type="submit"
    className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-500 transition duration-200"
  >
    {loading ? 'Sending...' : 'Send Message'}
  </button>
</div>
