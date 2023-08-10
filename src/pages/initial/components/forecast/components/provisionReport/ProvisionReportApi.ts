import HttpService from '../../../../../../shared/services/HttpService';

import { ListPrevisionSales } from './interfaces/ProvisionReport';

class ProvisionReportApi {
    public tvcPrevisionSales = (dataUrl: object): Promise<ListPrevisionSales> => {
        const url = 'tvc-manager/prevision-sales?month=' + dataUrl.month + '&oidDealer=' + dataUrl.oidDealer + '&year=' + dataUrl.year
        return HttpService.get(url)
    };
}
export default new ProvisionReportApi();