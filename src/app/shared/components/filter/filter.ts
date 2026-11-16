export interface FilterObject { label: string, search?:string,variable: string | any, check: boolean, value: any, placeholder: string,isDisable?: boolean,isMultiple?:boolean, options?: { label: string | {}, value: number | string}[], type: string}
export class ConstantFilterVariable {
    public static customerName = 'customerName';
    public static customerPhone = "customerPhone";
    public static customerCnic = "customerCnic";
    public static supplierName = 'supplierName';
    public static supplierCategory = 'supplierCategory';
    public static cityId = "cityId";
    public static date = 'date';
}

export class ConstantFilterLabel {
    public static customerName = 'Name';
    public static customerPhone = 'Customer Phone No.';
    public static customerCnic = "CNIC";
    public static supplierName = 'Name';
    public static supplierCategory = 'Category';
    public static CityId = 'City';
    public static date = "Date";
}

export interface SearchCriteria {
    toDate?: string;
    fromDate?: string;
    pagination?: 'enable' | 'disable';
    page?: number | Number;
    size?: number | Number;
}

const Filters: FilterObject[] = [
    { label: ConstantFilterLabel.date, variable: ConstantFilterVariable.date, check: false, value: [], placeholder: "", options: [], type: "date" },
    { label: ConstantFilterLabel.CityId, variable: ConstantFilterVariable.cityId, check: false, value: null, placeholder: ConstantFilterLabel.CityId, options: [], type: "select" },
    { label: ConstantFilterLabel.customerName, variable: ConstantFilterVariable.customerName, check: false, value: "", placeholder: "Customer Name", options: [], type: "text" },
    { label: ConstantFilterLabel.supplierName, variable: ConstantFilterVariable.supplierName, check: false, value: "", placeholder: "Supplier Name", options: [], type: "text" },
    { label: ConstantFilterLabel.supplierCategory, variable: ConstantFilterVariable.supplierCategory, check: false, value: "", placeholder: "Supplier Category", options: [], type: "text" },
    { label: ConstantFilterLabel.customerCnic, variable: ConstantFilterVariable.customerCnic, check: false, value: "", placeholder: "Customer CNIC", options: [], type: "text" },
];

export function GetAllFilters() {
    return JSON.parse(JSON.stringify(Filters));
};

export function GetSelectedFilters(variables: string[] ) {
    var filters: FilterObject[] = [];
    for (var variable of variables) {
        const field = Filters.find(field => field.variable == variable || field.label == variable );
        if (field) {
            filters.push(field);
        }
    }
    return JSON.parse(JSON.stringify(filters));
};