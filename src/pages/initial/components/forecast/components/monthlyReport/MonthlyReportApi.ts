import HttpService from '../../../../../../shared/services/HttpService';

import { ListPrevisionMonth } from './interfaces/MonthlyReport';

class MonthlyReportApi {
    public tvcPrevisionSales = (dataUrl: object): Promise<ListPrevisionMonth> => {
        const url = 'tvc-manager/prevision-month?isMonth=true&month=' + dataUrl.month + '&year=' + dataUrl.year
        return HttpService.get(url)
    };
    public downloadExcel = (data: object): Promise<BlobPart> => {
        const url = 'tvc-manager/export-year-report?isOnlyYear=' + data.isOnlyYear + '&month=' + data.month + '&oidDealer=' + data.oidDealer + '&year=' + data.year
        return HttpService.downloadFile('GET', url, data)
    };
}
export default new MonthlyReportApi();