import {User} from './types'
export default (user: User) => {
  let valid:Boolean = true;
  let error:String = '';
  if (!user.firstName) {
    valid = false;
    error = 'You must enter your first name';
  }
  if (!user.lastName) {
    valid = false;
    error = 'You must enter your last name';
  }
  if (!user.email) {
    valid = false;
    error = 'You must enter your email';
  }
  if (!user.password) {
    valid = false;
    error = 'You must create a password';
  }
  if(valid){
    return {...user, valid: true};
  } else {
    return {error, valid: false};
  }
};
