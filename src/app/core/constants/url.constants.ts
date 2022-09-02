const ENVIROMENT: string = 'DEV';


let MAIN_PATH_NET  = '';
let MAIN_PATH_AUTH = '';
switch (ENVIROMENT) {
  case 'DEV':
    MAIN_PATH_AUTH = 'http://seguridadweb.indratools.com/aut/seguridad';
    MAIN_PATH_NET  = 'https://localhost:3061/api/configurador/';
    // MAIN_PATH_NET  = 'https://localhost:3061/api/configurador/';
    break;
  case 'QA':
    MAIN_PATH_AUTH = '';
    break;
  case 'PROD':
    //  MAIN_PATH_NET = 'http://backtools.indratools.com/api/configurador/';
    break;
  default:
    break;
}

export const API_AUTH_SESSION = MAIN_PATH_AUTH + '/login';
export const API_ROLE = MAIN_PATH_AUTH + '/userRol';

// REGISTRO
export const API_PERSONAS = MAIN_PATH_NET + 'ExecuteQuery';
