import HttpService from '../../shared/services/HttpService';

import { ListDealer } from './interfaces/LowerSide';

class LowerSideApi {
	public tvcDealers = (oidDealer: number): Promise<ListDealer> => {
        const url = 'tvc-manager/dealers?oidDealer=' + oidDealer
        return HttpService.get(url)
    };
}

export default new LowerSideApi();