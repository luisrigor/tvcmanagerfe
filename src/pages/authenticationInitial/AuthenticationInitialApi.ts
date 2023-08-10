import HttpService from '../../shared/services/HttpService';

import { AuthenticationModel, AuthenticationSendModel, ListIndicators } from './interfaces/AuthenticationInitial';
class AuthenticationInitialApi {
	public login = (data: AuthenticationSendModel['loginToken']): Promise<AuthenticationModel> => {
		const url = 'sign-in/' + localStorage.getItem('Current')
		const headers = {
			'Content-Type': 'application/json',
			loginToken: data
		}
		return HttpService.sing(url, data)
	};
	public tvcIndicators = (): Promise<ListIndicators> => {
        const url = 'tvc-manager/set-indicator-filter-bean'
        return HttpService.get(url)
    };
}

export default new AuthenticationInitialApi();
