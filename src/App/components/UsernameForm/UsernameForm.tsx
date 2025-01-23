import React, { useState } from 'react';

interface UsernameFormProps {
  onSubmit: (username: string) => void;
}

export function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) onSubmit(name);
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
