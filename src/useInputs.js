import { useState, useCallback, useReducer } from 'react';

const reducer = (form, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
      return {
        ...form,
        [action.name]: action.value,
      };
    case 'RESET':
      return action.initialForm;
  }
};


function useInputs(initialForm) {
  // const [form, setForm] = useState(initialForm);
  const [form, dispatch] = useReducer(reducer, initialForm);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    // setForm(form => ({ ...form, [name]: value }));
    dispatch({
      type: 'ON_CHANGE',
      name,
      value,
    });
  }, []);

  const reset = useCallback(() => {
    // setForm(initialForm), [initialForm]
    dispatch({
      type: 'RESET',
      initialForm,
    });
  });

  return [form, onChange, reset];
};

export default useInputs;