const LOGIN_API_URL = 'http://172.16.100.181:8888';
const LOGIN_PATH = '/users/login';
const REGISTER_PATH = '/users/register'
const LOGOUT_PATH = '/users/logout'

let cookie;

type apiLogoutResponse = {
  message: string;
  status: string;
}

type apiFetchResponse = {
  message: string;
  status: string;
}

const postRegisterRequest = (httpVerb: string, name: string, email: string, password: string): RequestInit => {
  const init: RequestInit = {
    method: httpVerb,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  }
  return init;
}

const postLoginRequest = (httpVerb: string, name: string, password: string): RequestInit => {
  const init: RequestInit = {
    method: httpVerb,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      password: password
    })
  }
  return init;
}

export const postRegister = async (name: string, email: string, password: string): Promise<string> =>{
  let code: string
  const request: RequestInfo = `${LOGIN_API_URL}${REGISTER_PATH}` ;
  const response = await fetch(request, postRegisterRequest('POST', name, email, password))
  code = await response.status.toString()

  return code;
}

export const postLogin = async (name: string, password: string): Promise<string> => {
  let code: string = "";

  const request: RequestInfo = `${LOGIN_API_URL}${LOGIN_PATH}` ;
  const response = await fetch(request, postLoginRequest('POST', name, password))
  code = await response.status.toString()
  const cookieResponse = response.headers.get("Set-Cookie")

  return code;
}