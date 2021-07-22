import {AuthInputs} from './types'
export default (params: AuthInputs):boolean => {
  let valid:boolean = true;
  let error:string = '';
  if (!params.email) {
    valid = false;
    error = 'Invalid email';
  }
  if (!params.password) {
    valid = false;
    error = 'You must enter a password';
  }
  if(valid){
    return true
  } else {
    return false
  }
};
