import axios from 'axios';
// 공통 변수 설정
const DEFAULT_URL = 'http://localhost:8080';
let headers = {
  'Content-Type': 'application/json',
};

const saveDataInSessionStorage = (key, saveObj) => {
  window.sessionStorage.setItem(key, JSON.stringify(saveObj));
};

// 아이디/비밀번호 로그인
export const sendSigninReq = async (postBody) => {
  const res = await fetch(DEFAULT_URL + '/api/v1/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  });
  const json = await res.json();
  console.log(json);
  headers = { ...headers, Authorization: json.data.authorization };
  const result = { ...json, status: res.status };
  saveDataInSessionStorage('auth-token', result.data.authorization);

  return result;
};

// accesstoken 유효성 검증하여 로그인 상태 및 사용자 정보 확인
export const checkIfAccessTokenIsValid = async () => {
  if (!headers.Authorization) return null;

  const res = await fetch(DEFAULT_URL + '/api/v1/users/me/main-info', {
    method: 'GET',
    headers: {
      ...headers,
    },
  });
  console.log(res);

  const json = await res.json();
  const result = { ...json, status: res.status };
  // access token이 유효하지 않은 경우의 로직도 작성 필요함!
  // ㄴ 토큰 갱신 요청 로직 확인 필요
  // refresh token 사용시 http only 쿠키에 이를 담아서 보관한다.
  return result;
};

export const uploadImage = async (formData) => {
  console.log(headers);
  const res = await axios.post(
    'http://localhost:8080/api/local/uploadImage',
    formData,
    {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res;
};

export const savePost = async (postBody) => {
  const res = await fetch(DEFAULT_URL + '/api/v1/posts', {
    method: 'POST',
    body: JSON.stringify(postBody),
    headers: {
      ...headers,
    },
  });
  console.log(res);

  const json = await res.json();
  const result = { ...json, status: res.status };
  return result;
  //return promise.then((res) => res.json());
};

export const getBoardList = async () => {
  try {
    const res = await fetch(DEFAULT_URL + '/api/v1/boards', {
      method: 'GET',
      headers: {
        ...headers,
      },
    });

    const json = await res.json();
    console.log(json);

    const result = { ...json, status: res.status };
    saveDataInSessionStorage('boardList', result.data);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};
