import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { validatePasswordValue } from '../../api/InputValidation';

const SignupPasswordInput = ({ pwInput, verifyAvailableInput }) => {
  const [available, setAvailable] = useState({
    status: false,
    password: '',
  });
  const [valueAlertVisible, setValueAlertVisible] = useState(false);

  const alertVisibleHandler = () => {
    setValueAlertVisible(false);
  };

  const validateValue = () => {
    const password = pwInput.current.value;
    if (available.password == password) return;

    if (!validatePasswordValue(password)) {
      setAvailable({ status: false, password: password });
      setValueAlertVisible(true);
      pwInput.current.focus();
      return;
    }
    setAvailable({ status: true, password: password });
    setValueAlertVisible(false);
  };

  useEffect(() => {
    verifyAvailableInput({ password: available.status });
  }, [available]);

  return (
    <div className="flex-col">
      <input
        className="mb-small"
        type="password"
        placeholder="비밀번호(10자리 이상)를 입력해주세요."
        ref={pwInput}
        onBlur={validateValue}
        onChange={alertVisibleHandler}
      />
      {valueAlertVisible ? (
        <span className="signup-info mb-small">
          규칙에 맞지 않는 비밀번호입니다. 다시 확인해주세요.
        </span>
      ) : null}
    </div>
  );
};

export default SignupPasswordInput;
