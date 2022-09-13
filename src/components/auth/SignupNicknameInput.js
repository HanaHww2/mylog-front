import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  validatePasswordValue,
  validateSimpleValue,
} from '../../api/InputValidation';

const SignupNicknameInput = ({ nicknameInput, verifyAvailableInput }) => {
  const [available, setAvailable] = useState({
    status: true,
    nickname: '',
  });
  const [valueAlertVisible, setValueAlertVisible] = useState(false);

  const alertVisibleHandler = () => {
    setValueAlertVisible(false);
  };
  const validateValue = (value) => {
    const nickname = nicknameInput.current.value;
    if (available.nickname == nickname) return;

    if (nickname && !validateSimpleValue(nickname)) {
      setAvailable({ status: false, nickname: nickname });
      setValueAlertVisible(true);
      nicknameInput.current.focus();
      return;
    }
    setAvailable({ status: true, nickname: nickname });
    setValueAlertVisible(false);
  };

  useEffect(() => {
    verifyAvailableInput({ nickname: available.status });
  }, [available]);

  return (
    <div className="flex-col">
      <input
        className="mb-small"
        type="text"
        placeholder="이름(별명)을 입력해주세요. (공백일 시 상동)"
        ref={nicknameInput}
        onBlur={validateValue}
        onChange={alertVisibleHandler}
      />
      {valueAlertVisible ? (
        <span className="signup-info mb-small">
          잘못된 이름입니다. 다시 확인해주세요.
        </span>
      ) : null}
    </div>
  );
};

export default SignupNicknameInput;
