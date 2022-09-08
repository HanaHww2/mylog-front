import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { sendSignupReq } from '../../api/Api';

const Signup = (props) => {
  const emailInput = useRef();
  const pwInput = useRef();
  const nameInput = useRef();
  const uriInput = useRef();
  const navigate = useNavigate();

  const singupBtnHandler = async () => {
    const postBody = {
      email: emailInput.current.value,
      password: pwInput.current.value,
    };
    const result = await sendSignupReq(postBody);

    if (result.status === 200) {
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
    console.log(props.visible);
    console.log('signup-modal-rendered');
    emailInput.current.value = '';
    pwInput.current.value = '';

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
          <input
            className="mb-normal"
            type="email"
            placeholder="이메일을 입력해주세요."
            ref={emailInput}
          />
          <input
            className="mb-normal"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            ref={pwInput}
          />
          <input
            className="mb-normal"
            type="text"
            placeholder="고유한 사용자명을 입력해주세요."
            ref={uriInput}
          />
          <input
            className="mb-normal"
            type="text"
            placeholder="사용할 이름(별명)을 입력해주세요."
            ref={nameInput}
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
