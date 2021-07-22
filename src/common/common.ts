import {validate as uuidValidate} from 'uuid';

export const isValidUuid = (id:string)=> uuidValidate(id);