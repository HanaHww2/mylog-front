import React, { useRef } from 'react';
import { useEffect } from 'react';
import { sendSigninReq } from '../../api/Api';

const Signin = (props) => {
  const emailInput = useRef();
  const pwInput = useRef();

  const singinBtnHandler = async () => {
    const postBody = {
      email: emailInput.current.value,
      password: pwInput.current.value,
    };
    const result = await sendSigninReq(postBody);

    if (result.status === 200) {
      //setSidebarVis(data);
      props.signinModalHandler();
      props.setUnsigned(false);
    } else {
      // TODO 수정 필요, Alert ''모달''을 이용해 오류 메세지를 보여준다.
      // 근데 인프런도 Alert 쓰네 ㅎ,ㅎ
      alert(result.message);
    }
  };
  const modalChangeHandler = () => {
    props.signinModalHandler();
    props.signupModalHandler();
  };
  useEffect(() => {
    console.log('login-modal-rendered');
    emailInput.current.value = '';
    pwInput.current.value = '';

    emailInput.current.focus();
  }, [props.visible]);

  return (
    <div className={`center-modal ${props.visible ? 'show' : 'hidden'}`}>
      <div className="modal-content singin">
        <div className="flex-row justify-end">
          <h4 className="modal-logo">🚀 MyLog</h4>
          <button className="" onClick={props.signinModalHandler}>
            ×
          </button>
        </div>
        <div className="flex-col wrapper-nm">
          <input
            className="mb-normal"
            type="email"
            placeholder="이메일을 입력해주세요"
            ref={emailInput}
            //id="login-email"
          />
          <input
            className="mb-normal"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            ref={pwInput}
            //id=""
          />
          <button onClick={singinBtnHandler}>로그인</button>
        </div>
        <div>
          <button>비밀번호 찾기</button>
          <button onClick={modalChangeHandler}>회원가입</button>
        </div>
        <div className="wrapper-nm">
          <hr className="pale-borderline" />
          <span className="pale-borderline-index">간편 로그인</span>
          <ul className="flex-row justify-center">
            <li>
              <button>구글</button>
            </li>
            <li>
              <button>깃헙</button>
            </li>
            <li>
              <button>네이버</button>
            </li>
            <li>
              <button>카카오</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Signin;
