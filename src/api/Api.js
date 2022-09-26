import axios from 'axios';
// 공통 변수 설정
const DEFAULT_URL = 'http://localhost:8080';
let headers = {
  'Content-Type': 'application/json',
};

// 세션 스토리지 저장
const saveDataInSessionStorage = (key, saveObj) => {
  window.sessionStorage.setItem(key, JSON.stringify(saveObj));
};
const delDataInSessionStorage = (key) => {
  window.sessionStorage.removeItem(key);
};
export const getDataInSessionStorage = (key) => {
  let result;
  try {
    const data = window.sessionStorage.getItem(key);
    result = JSON.parse(data);
  } catch (e) {
    console.log(e);
    result = null;
  }
  return result;
};

// accesstoken 유효성 검증하여 로그인 상태 및 사용자 정보 확인
export const checkIfAccessTokenIsValid = async () => {
  if (!headers.Authorization && getDataInSessionStorage('auth-token')) {
    headers.Authorization = getDataInSessionStorage('auth-token');
  } else if (!headers.Authorization && !getDataInSessionStorage('auth-token')) {
    return;
  }

  try {
    const res = await fetch(DEFAULT_URL + '/api/v1/users/me/main-info', {
      method: 'GET',
      headers: {
        ...headers,
      },
    });

    const json = await res.json();
    const result = { ...json, status: res.status };
    return result;
  } catch (e) {
    delDataInSessionStorage('auth-token');
    delDataInSessionStorage('userId');
    return { status: 403 };
  }
  // access token이 유효하지 않은 경우의 로직도 작성 필요함!
  // ㄴ 토큰 갱신 요청 로직 확인 필요
  // refresh token 사용시 http only 쿠키에 이를 담아서 보관한다.
};

// 아이디/비밀번호 로그인
export const sendSigninReq = async (postBody) => {
  const res = await fetch(DEFAULT_URL + '/api/v1/auth/signin', {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify(postBody),
  });
  const json = await res.json();

  headers = { ...headers, Authorization: json.data.authorization };
  const result = { ...json, status: res.status };
  saveDataInSessionStorage('auth-token', result.data.authorization);
  saveDataInSessionStorage('userId', result.data.id);
  return result;
};

// 아이디/비밀번호 로그인
export const sendSignupReq = async (postBody) => {
  const res = await fetch(DEFAULT_URL + '/api/v1/auth/signup', {
    method: 'POST',
    headers: { ...headers },
    body: JSON.stringify(postBody),
  });
  const json = await res.json();
  const result = { ...json, status: res.status };

  return result;
};

export const checkIfDuplicatedEmail = async (email) => {
  console.log(email);
  const res = await fetch(DEFAULT_URL + '/api/v1/auth/duplicatedEmail', {
    method: 'POST',
    headers: { ...headers },
    body: JSON.stringify({ email: email }),
  });

  const json = await res.json();
  const result = { ...json, status: res.status };
  console.log(res, result);
  return result;
};

export const checkIfDuplicatedName = async (name) => {
  const res = await fetch(DEFAULT_URL + '/api/v1/auth/duplicatedName', {
    method: 'POST',
    headers: { ...headers },
    body: JSON.stringify({ name: name }),
  });

  const json = await res.json();
  const result = { ...json, status: res.status };
  console.log(res, result);
  return result;
};

// 이미지 업로드
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
  console.log(res);
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

// 사용자가 권한을 가진 전체 보드 리스트 조회
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

// 사용자가 방문한 특정 보드 조회
export const getBoardInfo = async (boardId) => {
  try {
    const res = await fetch(DEFAULT_URL + '/api/v1/boards/' + boardId, {
      method: 'GET',
      headers: {
        ...headers,
      },
    });

    const json = await res.json();
    const result = { ...json, status: res.status };
    saveDataInSessionStorage('visitingBoard', result.data);
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getBoardInfoByUri = async (uriArr) => {};

const contentHandler = (content) => {
  const dom = document.createElement('div');
  dom.innerHTML = content;
  const text = dom.innerText;
  return text;
};

export const getPostListBy = async (searchParams) => {
  console.log(searchParams);
  let params = new URLSearchParams();

  if (searchParams.categoryId) {
    params.append('categoryId', encodeURIComponent(searchParams.categoryId));
  }
  if (searchParams.boardId) {
    params.append('boardId', encodeURIComponent(searchParams.boardId));
  }
  const url = DEFAULT_URL + '/api/v1/posts?' + params;
  console.log(url);

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
    },
  }); // 보드별, 카테고리별 조회 필요
  const json = await res.json();

  if (!json.data) return [];
  const result = json.data.map((item) => {
    item.plainContent = contentHandler(item.content);
    return item;
  });
  console.log(result);
  return result;
};

export const getPostListForMain = async () => {
  const url = DEFAULT_URL + '/api/v1/posts/all';
  // 조회수 기준으로 정렬 (5개)
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
    },
  }); // 보드별, 카테고리별 조회 필요
  const json = await res.json();

  const result = json.data.map((item) => {
    item.plainContent = contentHandler(item.content);
    return item;
  });
  console.log(result);
  return result;
};

// fetch('http://localhost:8080/api/v1/posts/' + postId)
//   .then((res) => res.json())
//   .then((json) => {
//     console.log(json);
//     const result = json.data;
//     const log = { ...result }; //, content: contentHandler(result.content) };
//     setLog({ ...log });
//     //setLogs(json.data);
//   });
// setLog({ ...data });
//setLogs(mockPost);

// common GET METHOD API CALL
export const getData = async (uri, searchParams) => {
  console.log(searchParams);

  let paramString = '';
  if (searchParams) {
    paramString += '?';

    paramString += Object.keys(searchParams)
      .map(
        (k) =>
          `${encodeURIComponent(k)}=${encodeURIComponent(searchParams[k])}`,
      )
      .join('&');
  }

  const url = DEFAULT_URL + uri + paramString;
  console.log(url);

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
    },
  });
  // 보드별, 카테고리별 조회 필요
  const json = await res.json();

  if (!json.data) return [];

  const result = { ...json, status: res.status };
  console.log(result);

  return result;
};

export const postData = async (uri, reqBody) => {
  const url = DEFAULT_URL + uri;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(reqBody),
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

export const patchData = async (uri, reqBody) => {
  const url = DEFAULT_URL + uri;
  const res = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(reqBody),
    headers: {
      ...headers,
    },
  });
  console.log(res);

  const json = await res.json();
  const result = { ...json, status: res.status };
  return result;
};
