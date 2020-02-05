import { environment } from './../environment';

export class Logger {
    public static log(...args: any[]): void {
        if (!environment.production) {
            // tslint:disable-next-line:no-console
            Function.apply.call(console.log, console, arguments);
        }
    }
    public static info(...args: any[]): void {
        if (!environment.production) {
            // tslint:disable-next-line:no-console
            Function.apply.call(console.info, console, arguments);
        }
    }
    public static error(...args: any[]): void {
        if (!environment.production) {
            // tslint:disable-next-line:no-console
            Function.apply.call(console.error, console, arguments);
        }
    }

}
