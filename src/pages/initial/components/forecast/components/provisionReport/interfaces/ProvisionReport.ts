export interface ListPrevisionSales {
    vecDealers:                VecDealer[];
    hstUsedCarsPrevisionSales: Hst[];
    hstAnualPrevision:         Hst[];
}

export interface Hst {
    id:            number;
    oidDealer:     string;
    year:          number;
    month:         number;
    previsionType: string;
    status:        string;
    previsionTvc:  number;
    previsionSn:   number;
    createdBy:     string;
    dtCreated:     DtC;
    changedBy:     string;
    dtChanged:     DtC;
}

export interface DtC {
    date: DateClass;
    time: Time;
}

export interface DateClass {
    year:  number;
    month: number;
    day:   number;
}

export interface Time {
    hour:   number;
    minute: number;
    second: number;
    nano:   number;
}

export interface VecDealer {
    ivObjectId:          string;
    ivDesig:             string;
    ivOid_Parent:        string;
    ivEnd:               string;
    ivNrDoor:            string;
    ivFloor:             string;
    ivTel:               string;
    ivResp:              string;
    ivObs:               string;
    ivEmail:             string;
    ivCp4:               number;
    ivCp3:               number;
    ivCpExt:             string;
    ivFax:               string;
    ivSuffixLogin:       string;
    ivComercialName:     string;
    ivMunicipality:      string;
    ivDistrict:          string;
    ivCountry:           string;
    ivIdMinisite:        string;
    ivUrlMinisite:       string;
    ivUrlexterno:        string;
    ivUrlUsados:         string;
    ivDealerCode:        string;
    ivSalesCode:         string;
    ivAfterSalesCode:    string;
    ivToyotaDealerCode:  string;
    ivFacilityCode:      string;
    ivStatus:            string;
    ivOIdNet:            string;
    ivTarsUOID:          string;
    ivNif:               string;
    ivUrlDmsWS:          string;
    ivCAMember:          boolean;
    ivGSCMember:         boolean;
    ivGPS_X:             string;
    ivGPS_Y:             string;
    ivDtOpenInstalation: string;
    ivOidBrand:          string;
    ivDtCreated:         string;
    ivDtChanged:         string;
}
export type PrevisionSalesSendType = {
    actualMonth: number;
    actualYear: number;
    id: number;
    oidDealer: string;
    previsionSn: number;
    previsionTvc: number;
    status: string;
}

export class PrevisionSalesSendModel {
    public actualMonth = 0
    public actualYear = 0;
    public id = 0;
    public oidDealer = '';
    public previsionSn = 0
    public previsionTvc = 0;
    public status = '';

    toModel () {
        return {
            actualMonth: this.actualMonth,
            actualYear: this.actualYear,
            id: this.id,
            oidDealer: this.oidDealer,
            previsionSn: this.previsionSn,
            previsionTvc: this.previsionTvc,
            status: this.status
        };
    }
}