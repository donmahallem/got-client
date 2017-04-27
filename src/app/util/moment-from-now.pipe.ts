import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({ name: "momentFromNow" })
export class MomentFromNowPipe implements PipeTransform {
    transform(value: number): string {
        return moment(value).fromNow();
    }
}