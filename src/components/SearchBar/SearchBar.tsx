import React, { useState, FormEvent, ChangeEvent } from 'react';

type SearchbarProps = {
  onSubmit: (query: string) => void;
};

const Searchbar: React.FC<SearchbarProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed === '') return;
    onSubmit(trimmed);
    setInput('');
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Searchbar;
