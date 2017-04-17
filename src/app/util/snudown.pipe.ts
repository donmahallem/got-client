import {
    Component,
    Pipe,
    PipeTransform
} from "@angular/core";
/// <reference path="snudown-js.d.ts" />
import * as snudown from "snudown-js";

@Pipe({ name: "snudown" })
export class SnudownPipe implements PipeTransform {
    transform(value: string): string {
        return snudown.markdown(value);
    }
}