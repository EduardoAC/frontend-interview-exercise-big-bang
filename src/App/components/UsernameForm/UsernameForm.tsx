import React, { useState } from "react";

interface UsernameFormProps {
  onSubmit: (username: string) => void;
}

export function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPlayername = name.trim();
    if (trimmedPlayername) {
      onSubmit(trimmedPlayername);
      setName("");
      setError(""); // Clear error on successful submission
    } else {
      setError("Player name is required.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto space-y-4">
      <label htmlFor="username" className="block text-lg font-semibold">
        Enter your name:
      </label>
      <input
        type="text"
        id="username"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
      />
      <p className="text-red-500 text-sm text-left font-medium">{error}</p>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Add player
      </button>
    </form>
  );
}
