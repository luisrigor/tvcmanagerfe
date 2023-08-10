export interface ListAnnualReport {
    vecDealers:                VecDealer[];
    hstUsedCarsPrevisionSales: Hst[];
    hstAnualPrevision:         Hst[];
}

export interface Hst {
    oidDealer:    string;
    previsionTvc: number;
    previsionSn:  number;
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
