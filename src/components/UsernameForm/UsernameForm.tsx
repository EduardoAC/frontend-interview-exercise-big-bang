import React, { useState } from 'react';

interface UsernameFormProps {
  setUsername: (username: string) => void;
}

export function UsernameForm({ setUsername }: UsernameFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) setUsername(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Enter your name:</label>
      <input
        type="text"
        id="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Start</button>
    </form>
  );
};
