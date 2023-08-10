import HttpService from '../../shared/services/HttpService';

import { ListDealer } from './interfaces/TopSide';

class TopSideApi {
	public tvcDealers = (oidDealer: number): Promise<ListDealer> => {
        const url = 'tvc-manager/dealers?oidDealer=' + oidDealer
        return HttpService.get(url)
    };
}

export default new TopSideApi();