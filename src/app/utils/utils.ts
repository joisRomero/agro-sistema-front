import { DatePipe } from "@angular/common"

export abstract class Utils {

    static downloadFromBlob(data: any, extension: string) {
        const a = document.createElement('a');
        a.download = "archivo".concat(extension);
        a.href = (window.webkitURL || window.URL).createObjectURL(data);
        a.click();
    };

    static uploadFile(data: any, extension: string) {
        const file: any = "";
        return file
    };
}