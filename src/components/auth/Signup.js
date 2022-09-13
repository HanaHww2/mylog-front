import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  checkIfDuplicatedEmail,
  checkIfDuplicatedName,
  sendSignupReq,
} from '../../api/Api';
import SignupEmailInput from './SignupEmailInput';
import SignupNameInput from './SignupNameInput';
import SignupNicknameInput from './SignupNicknameInput';
import SignupPasswordInput from './SignupPasswordInput';

const Signup = (props) => {
  const emailInput = useRef();
  const pwInput = useRef();
  const nameInput = useRef();
  const nicknameInput = useRef();
  const navigate = useNavigate();

  const avilableInput = {
    email: false,
    name: false,
    password: false,
    nickname: true,
  };

  const verifyAvailableInput = ({
    email = avilableInput.email,
    name = avilableInput.name,
    password = avilableInput.password,
    nickname = avilableInput.nickname,
  }) => {
    avilableInput.email = email;
    avilableInput.name = name;
    avilableInput.password = password;
    avilableInput.nickname = nickname;
  };

  const validateInput = (postBody) => {
    console.log(avilableInput);

    if (!avilableInput.email) {
      alert('이메일을 다시 확인해주세요.');
      return false;
    }
    if (!avilableInput.name) {
      alert('명칭을 다시 확인해주세요.');
      return false;
    }
    if (!avilableInput.password) {
      alert('비밀번호를 다시 확인해주세요.');
      return false;
    }
    if (!avilableInput.nickname) {
      alert('별명을 다시 확인해주세요.');
      return false;
    }
    return true;
  };
  const singupBtnHandler = async () => {
    const postBody = {
      email: emailInput.current.value,
      password: pwInput.current.value,
      name: nameInput.current.value,
      nickname: nicknameInput.current.value
        ? nicknameInput.current.value
        : nameInput.current.value,
    };

    console.log(postBody);
    if (!validateInput(postBody)) return;

    const result = await sendSignupReq(postBody);
    console.log(result);

    if (result.status == 201 || result.status == 200) {
      //setSidebarVis(data);
      alert('회원가입이 완료되었습니다. 로그인 후 이용해주세요.');
      modalChangeHandler();
    } else {
      // TODO 수정 필요, Alert ''모달''을 이용해 오류 메세지를 보여준다.
      // 근데 인프런도 이렇게 하네 ㅎ,ㅎ
      alert(result.message);
    }
  };

  const modalChangeHandler = () => {
    props.signinModalHandler();
    props.signupModalHandler();
  };

  useEffect(() => {
    console.log('signup-modal-rendered');

    // emailInput.current.value = '';
    // pwInput.current.value = '';
    // nameInput.current.value = '';
    // nicknameInput.current.value = '';

    emailInput.current.focus();
  }, [props.visible]);

  return (
    <div className={`center-modal ${props.visible ? 'show' : 'hidden'}`}>
      <div className="modal-content signup">
        <div className="flex-row justify-end">
          <h4 className="modal-logo">🚀 MyLog</h4>
          <button className="" onClick={props.signupModalHandler}>
            ×
          </button>
        </div>
        <div className="flex-col wrapper-nm">
          <SignupEmailInput
            emailInput={emailInput}
            verifyAvailableInput={verifyAvailableInput}
          />
          <SignupPasswordInput
            pwInput={pwInput}
            verifyAvailableInput={verifyAvailableInput}
          />

          <SignupNameInput
            nameInput={nameInput}
            verifyAvailableInput={verifyAvailableInput}
          />
          <SignupNicknameInput
            nicknameInput={nicknameInput}
            verifyAvailableInput={verifyAvailableInput}
          />

          <button onClick={singupBtnHandler}>회원가입</button>
        </div>
        <div>
          <hr className="pale-borderline" />
          <span className="pale-borderline-index">이용 약관</span>
          <div>andkjadjfl;sdslflkdfkslfjdksfjlsdjflkdsjfjdslksdjljfk</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
