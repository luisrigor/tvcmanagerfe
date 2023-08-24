export interface ListIndicatorSales {
    existInBD: boolean;
    isCa: boolean;
    notHasEuroLinea: boolean;
    usedCarsIndicatorsSales: UsedCarsIndicatorsSales;
    filterBeanisValidOpenMonth: boolean;
}

export interface UsedCarsIndicatorsSales {
    id: number;
    oidDealer: string;
    year: number;
    month: number;
    totUsedCars: number;
    status: string;
    createdBy: string;
    dtCreated: DtC;
    changedBy: string;
    dtChanged: DtC;
}

export interface DtC {
    date: DateClass;
    time: Time;
}

export interface DateClass {
    year: number;
    month: number;
    day: number;
}

export interface Time {
    hour: number;
    minute: number;
    second: number;
    nano: number;
}

export interface ListSalesLines {
    id: number;
    idUsedCarsIndicatorsSales: number;
    usedCarsIndicators: string;
    indicatorValue: number;
    createdBy: string;
    dtCreated: string;
    changedBy: string;
    dtChanged: string;
}
