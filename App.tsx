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
  background-image: url("https://firebasestorage.googleapis.com/v0/b/qwilt-matcher.appspot.com/o/Qwilt_Digital_Background-10%201.jpg?alt=media&token=adc840ed-7e3c-4b09-a77e-4f459acf2919");
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;
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
  }
`;

const TitleSpn = styled.div`
  width: 100vw;
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  color: white;
`;
const BigTitleSpn = styled(TitleSpn)`
  font-size: 2.5rem;
`;

const WelcomeDiv = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  align-items: center;
  justify-items: center;
  grid-gap: 1rem;
`;

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<TempUserType>();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <AppView>
      {currentUser ? (
        isStarted ? (
          <CategoriesSelector currentUser={currentUser} data={categories} />
        ) : (
          <WelcomeDiv>
            <TitleSpn>
              {currentUser.firstName} {currentUser.lastName}
            </TitleSpn>
            <BigTitleSpn>{'Welcome to Qwilt Matcher'}</BigTitleSpn>
            <TitleSpn>
              {'The place to create new friendships at Qwilt'}
            </TitleSpn>
            <button type="button" onClick={() => setIsStarted(true)}>
              {'Start'}
            </button>
          </WelcomeDiv>
        )
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
          <BigTitleSpn>{'Qwilt Matcher'}</BigTitleSpn>
          <TitleSpn>Tell us who you are</TitleSpn>
          <label htmlFor="firstName">First Name</label>
          <input
            required
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            required
            pattern="[a-z0-9._%+-]+@qwilt\.com$"
            type="email"
            name="email"
            value={email}
            title="Email must belong to @qwilt.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">That's me</button>
        </form>
      )}
    </AppView>
  );
}

export default App;
