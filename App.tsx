import React, { useState } from 'react';
import './style.css';
import { categories, TempUserType } from './data';
import CategoriesSelector from './CategoriesSelector';
import styled from 'styled-components';

const AppView = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  background-color: #63A6D5;
  background-image: url("https://cdn.discordapp.com/attachments/1007944362619060275/1103336256064196688/Qwilt_Digital_Background-10_1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;

  form {
    display: grid;
    grid-auto-flow: row;
    align-items: center;
    justify-items: center;
    grid-gap: 1rem;

    label {
      color: white;
    }

    input {
      border: none;
      border-radius: 16px;
      padding: 0.5rem;
    }

    button {
      border: 1px solid black;
      border-radius: 1rem;
      background: #26929B;
      padding: 0.5rem 1rem;
      color: white;
      font-weight: 600;
      font-size: 2rem;
      &:focus {outline: none;}
      cursor: pointer;
    }
  }
`;

const TitleSpn = styled.div`
  width: 100vw;
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  color: white;
`;

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<TempUserType>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <AppView>
      {currentUser ? (
        <CategoriesSelector currentUser={currentUser} data={categories} />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentUser({
              firstName,
              lastName,
              email,
            });
          }}
        >
          <TitleSpn>Tell us who you are</TitleSpn>
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">That's me</button>
        </form>
      )}
    </AppView>
  );
}

export default App;
