import React from 'react';
import { useState } from 'react';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import Navbar from '../components/Navbar';

const Header = (props) => {
  const [signinModalVis, setSigninModalVis] = useState(false);
  const [signupModalVis, setSignupModalVis] = useState(false);
  const signinModalHandler = () => setSigninModalVis(!signinModalVis);
  const signupModalHandler = () => setSignupModalVis(!signupModalVis);

  return (
    <div>
      <Navbar
        unsigned={props.unsigned}
        visible={props.sidebarVis}
        sidebarHandler={props.sidebarHandler}
        signinModalHandler={signinModalHandler}
      />
      {signinModalVis ? (
        <Signin
          setUnsigned={props.setUnsigned}
          visible={signinModalVis}
          signinModalHandler={signinModalHandler}
          signupModalHandler={signupModalHandler}
        />
      ) : null}
      {signupModalVis ? (
        <Signup
          visible={signupModalVis}
          signinModalHandler={signinModalHandler}
          signupModalHandler={signupModalHandler}
        />
      ) : null}
    </div>
  );
};

export default Header;
