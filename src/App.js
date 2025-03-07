import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Store the created user
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    try {
      const response = await fetch('https://mern-backend-hmh7.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Store the created user in state
      } else {
        setError('Error saving user');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className="App">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Save User</button>
      </form>

      {error && <p>{error}</p>}

      {user && (
        <div>
          <h2>User Created:</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
