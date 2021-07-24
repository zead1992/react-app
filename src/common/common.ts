import {validate as uuidValidate} from 'uuid';

export const isValidUuid = (args:{id:string})=> uuidValidate(args.id);