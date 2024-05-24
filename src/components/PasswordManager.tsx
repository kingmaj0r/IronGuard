import React, { useState, useEffect } from "react";

function PasswordManager() {
  const [passwords, setPasswords] = useState([]);
  const [showError, setShowError] = useState(false); 

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  const addPassword = (newPassword) => {
    if (passwords.length < 5) {
      const updatedPasswords = [...passwords, newPassword];
      setPasswords(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  const removePassword = (index) => {
    const updatedPasswords = passwords.filter((_, i) => i !== index);
    setPasswords(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Password Manager</h1>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const newPassword = form.elements.namedItem('password') as HTMLInputElement;
            const trimmedPassword = newPassword.value.trim();
            if (trimmedPassword !== "") {
              addPassword(trimmedPassword);
              form.reset();
            }
          }}
          className="mb-4"
        >
          <input
            type="text"
            name="password"
            placeholder="Enter a password"
            className="border border-gray-300 rounded-md px-3 py-2 mr-2 w-3/4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Password
          </button>
        </form>
        {showError && (
          <p className="text-red-500 mb-2">Maximum passwords allowed is 5</p>
        )}
        <ul className="grid grid-cols-1 gap-4">
          {passwords.map((password, index) => (
            <li
              key={index}
              className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-2"
            >
              <span>{password}</span>
              <button
                onClick={() => removePassword(index)}
                className="text-red-500 hover:text-red-600 transition duration-300"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PasswordManager;