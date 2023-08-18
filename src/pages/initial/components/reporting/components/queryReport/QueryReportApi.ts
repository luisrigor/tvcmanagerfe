import HttpService from '../../../../../../shared/services/HttpService';

import { ListQueryReport } from './interfaces/QueryReport';
// http://devtvcmanager.rigorcg.pt/TVCManager/tvc-manager/files-list?oidDealer=SC00020001&uploadDir=C%3A%5CUsers%5CPre%20Job%5CDocuments&year=2023
class QueryReportApi {
    public tvcFilesList = (dataUrl: object): Promise<ListQueryReport> => {
        const url = 'tvc-manager/files-list?oidDealer=' + dataUrl.oidDealer + '&uploadDir=' + dataUrl.uploadDir + '&year=' + dataUrl.year
        return HttpService.get(url)
    };
}
export default new QueryReportApi();