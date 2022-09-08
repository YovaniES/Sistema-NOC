const ENVIROMENT: string = 'DEV';
// const ENVIROMENT: string = 'PROD';


let PATH_BACK_NET  = '';
let PATH_AUDITORIA_AUTH = '';
switch (ENVIROMENT) {
  case 'DEV':
    PATH_AUDITORIA_AUTH = 'http://auditoriaseguridadapi2.indratools.com/aut/seguridad/';
    PATH_BACK_NET       = 'https://localhost:3061/api/configurador/';
    break;
  case 'QA':
    PATH_AUDITORIA_AUTH = '';
    break;
  case 'PROD':
    // PATH_AUDITORIA_AUTH = 'http://auditoriaseguridadapi2.indratools.com/aut/seguridad/';
    // PATH_BACK_NET       = 'http://auditoriabackapi.indratools.com/api/configurador/';
    break;
  default:
    break;
}

// LOGIN
export const API_AUTH_SESSION_AUDITORIA = PATH_AUDITORIA_AUTH + '/login';

// REGISTRO EVENTO
export const API_EVENTO = PATH_BACK_NET + 'ExecuteQuery';
