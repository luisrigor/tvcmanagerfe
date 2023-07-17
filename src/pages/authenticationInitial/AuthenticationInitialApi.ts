import HttpService from '../../shared/services/HttpService';

import { AuthenticationModel, AuthenticationSendModel } from './interfaces/AuthenticationInitial';

// http://localhost:8083/mk-services/sign-in/13
class AuthenticationInitialApi {
	public login = (data: AuthenticationSendModel['loginToken']): Promise<AuthenticationModel> => {
		console.log('loginnn', data)
		const url = 'sign-in/' + localStorage.getItem('Current')
		const headers = {
			'Content-Type': 'application/json',
			loginToken: data
		}
		return HttpService.sing(url, data)
	};
}

export default new AuthenticationInitialApi();
