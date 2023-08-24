import HttpService from '../../../../../../shared/services/HttpService';

import { ListIndicatorSales, ListSalesLines } from './interfaces/MonthlyReports';

class MonthlyReportsApi {
    public tvcIndicadorSales = (dataUrl: object): Promise<ListIndicatorSales> => {
        const url = 'tvc-manager/indicator-sales?month=' + dataUrl.month + '&oidDealer=' + dataUrl.oidDealer + '&year=' + dataUrl.year
        return HttpService.get(url)
    }
    public tvcSalesLines = (idUsedCars: string): Promise<ListSalesLines> => {
        const url = 'tvc-manager/sales-lines?idUsedCars=' + idUsedCars 
        return HttpService.get(url)
    }
    public tvcSave = (data: object): Promise<string> => {
        const url = 'tvc-manager/indicator-sales'
        return HttpService.post(url, data)
    }
}
export default new MonthlyReportsApi();