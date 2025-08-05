import React, { useState } from 'react'

const DeleteAcc = () => {
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate API call
    setTimeout(() => {
      alert(`Account deleted with password: ${password}`);
      setSubmitted(false);
      setPassword('');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md transition-all duration-500">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Confirm Account Deletion
        </h2>

        <form onSubmit={handleDelete} className="flex flex-col space-y-8">
          <div >
            <label>
              Enter Password
            </label>
            <input type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-red-500 outline-none px-1 py-2 transition-all duration-300"
              placeholder="Confirm Password "
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-medium transition duration-300 ${
              submitted
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {submitted ? 'Deleting...' : 'Delete Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteAcc
