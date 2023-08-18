import HttpService from '../../../../../../shared/services/HttpService';

import { ListPrevisionSales, PrevisionSalesSendModel } from './interfaces/ProvisionReport';

class ProvisionReportApi {
    public tvcPrevisionSales = (dataUrl: object): Promise<ListPrevisionSales> => {
        const url = 'tvc-manager/prevision-sales?month=' + dataUrl.month + '&oidDealer=' + dataUrl.oidDealer + '&year=' + dataUrl.year
        return HttpService.get(url)
    }
    public tvcSave = (data: PrevisionSalesSendModel): Promise<string> => {
        const url = 'tvc-manager/save-prevision-sales'
        return HttpService.post(url, data)
    }
}
export default new ProvisionReportApi();