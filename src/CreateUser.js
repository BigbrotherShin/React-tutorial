import React, { useContext, useCallback, useRef } from 'react';
import { UserDispatch } from './App';
import useInputs from './useInputs';


function CreateUser() {
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const { username, email } = form;
  const nextId = useRef(4);
  const nameInput = useRef();
  const dispatch = useContext(UserDispatch);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    })
    nextId.current += 1;
    reset();
    nameInput.current.focus();
  }, [username, email, reset]);

  return (
    <div>
      <input
      name="username"
      placeholder="계정명"
      onChange={onChange}
      value={username}
      ref={nameInput}
      />
      <input
      name="email"
      placeholder="이메일"
      onChange={onChange}
      value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default React.memo(CreateUser);