import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { checkIfDuplicatedName } from '../../api/Api';
import {
  validateNameValue,
  validateSimpleValue,
} from '../../api/InputValidation';

const SignupNameInput = ({ nameInput, verifyAvailableInput }) => {
  const [nameAvailable, setNameAvailable] = useState({
    status: false,
    nmae: '',
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [valueAlertVisible, setValueAlertVisible] = useState(false);

  const alertVisibleHandler = () => {
    setAlertVisible(false);
  };

  const checkIfDuplicated = async (e) => {
    const name = nameInput.current.value;
    if (nameAvailable.name == name) return;

    if (!validateSimpleValue(name)) {
      return setValueAlertVisible(true);
    }
    setValueAlertVisible(false);

    const result = await checkIfDuplicatedName(name);
    if (result.status != 200) {
      setNameAvailable({ status: false, name: name });
      setAlertVisible(true);

      nameInput.current.focus();
    } else {
      setNameAvailable({ status: true, name: name });
    }
    return;
  };

  useEffect(() => {
    verifyAvailableInput({ name: nameAvailable.status });
  }, [nameAvailable]);

  return (
    <div className="flex-col">
      <input
        id="userNameInput"
        className="mb-small"
        type="text"
        placeholder="사용자명을 입력해주세요. (특수문자 불가)"
        ref={nameInput}
        onBlur={checkIfDuplicated}
        onChange={alertVisibleHandler}
      />
      {valueAlertVisible ? (
        <span className="signup-info mb-small">
          잘못된 이름입니다. 다시 확인해주세요.
        </span>
      ) : null}
      {!nameAvailable.status && alertVisible ? (
        <span className="signup-info mb-small">
          이미 등록된 명칭입니다. 다시 확인해주세요.
        </span>
      ) : null}
    </div>
  );
};

export default SignupNameInput;
