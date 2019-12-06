import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }, [inputs]);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'ace',
      email: 'aaa@aaa',
      active: true,
    },
    {
      id: 2,
      username: 'Yun',
      email: 'bbb@aaa',
      active: false,
    },
    {
      id: 3,
      username: 'Shin',
      email: 'ccc@aaa',
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const nameInput = useRef();

  const onCreate = useCallback(
    () => {
      const user = {
        id: nextId.current,
        username,
        email,
      };
      // setUsers([...users, user]);
      setUsers(users => users.concat(user));
      setInputs({
        username: '',
        email: '',
      })
      console.log(nextId.current);
      nextId.current += 1;
      nameInput.current.focus();
    }, [username, email]);

  const onRemove = useCallback(
    id => {
      setUsers(users => users.filter(user => user.id !== id));
    }, []);

  const onToggle = useCallback(
    id => {
      setUsers(users => users.map(
        user => (user.id === id)
          ? { ...user, active: !user.active }
          : user
      ))
    }, [])
  

  const count = useMemo(() => countActiveUsers(users), [users]); // Function Expressions(함수 표현식)

  return (
    <>
      <CreateUser
      username={username}
      email={email}
      onCreate={onCreate}
      onChange={onChange}
      nameInput={nameInput}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
