import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { checkIfDuplicatedEmail } from '../../api/Api';
import { EMAIL_REGEXP, validateEmailValue } from '../../api/InputValidation';

const SignupEmailInput = ({ emailInput, verifyAvailableInput }) => {
  const [emailAvailable, setEmailAvailable] = useState({
    status: false,
    email: '',
  });
  const [valueAlertVisible, setValueAlertVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const alertVisibleHandler = () => {
    setAlertVisible(false);
  };

  const checkIfDuplicated = async (e) => {
    const email = emailInput.current.value;
    if (emailAvailable.email == email) return;

    if (!validateEmailValue(email)) {
      return setValueAlertVisible(true);
    }
    setValueAlertVisible(false);

    const result = await checkIfDuplicatedEmail(email);
    if (result.status != 200) {
      setEmailAvailable({ status: false, email: email });
      setAlertVisible(true);
      emailInput.current.focus();
    } else {
      setEmailAvailable({ status: true, email: email });
    }
    return;
  };

  useEffect(() => {
    verifyAvailableInput({ email: emailAvailable.status });
  }, [emailAvailable]);

  return (
    <div className="flex-col">
      <input
        id="userEmailInput"
        className="mb-small"
        type="email"
        placeholder="이메일을 입력해주세요."
        ref={emailInput}
        onBlur={checkIfDuplicated}
        onChange={alertVisibleHandler}
      />
      {valueAlertVisible ? (
        <span className="signup-info mb-small">
          잘못된 이메일 주소입니다. 다시 확인해주세요.
        </span>
      ) : null}
      {!emailAvailable.status && alertVisible ? (
        <span className="signup-info mb-small">
          이미 등록된 이메일입니다. 다시 확인해주세요.
        </span>
      ) : null}
    </div>
  );
};

export default SignupEmailInput;
