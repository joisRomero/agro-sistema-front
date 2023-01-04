import { DatePipe } from "@angular/common"

export abstract class Convert {

    static numberToStringWithComma(value: number) {
        if (value != null || value != undefined) {
            if (value.toString() != "") {
                const dec = value.toString().split('.')[1]
                const len = dec && dec.length > 2 ? dec.length : 2
                let n = Number(value).toFixed(len)

                return String(n.toString().split(",").join("")).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
            }
            else { return "" }
        }
        else { return "" }
    }

    static addDecimals(num: number) {
        const dec = num.toString().split('.')[1]
        const len = dec && dec.length > 2 ? dec.length : 2
        return Number(num).toFixed(len)
    }

    static dateToDateInput(date: Date) {
        let datePipe: DatePipe = new DatePipe('en-US');
        let fullDate: string;
        fullDate = datePipe.transform(date, 'yyyy-MM-dd')!.toString();
        return fullDate;
    }

    static toyyyyMMdd(date: Date) {
        if (date != null || date != undefined) {
            if (date.toString() != "") {
                let datePipe: DatePipe = new DatePipe('en-US');
                // return date ? datePipe.transform(date, 'dd/MM/yyyy')!.toString() : "";
                return date ? datePipe.transform(date, 'yyyyMMdd')!.toString() : "";
            }
            else { return "" }
        }
        else { return "" }
    }

    static stringToDDmmYYYY(date: string) {
        let date1: string, date2: string, date3: string, fullDate: string;
        date1 = date.split("-")[0];
        date2 = date.split("-")[1];
        date3 = date.split("-")[2];
        return `${date3}/${date2}/${date1}`
    }
}