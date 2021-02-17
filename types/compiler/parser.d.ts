import { TemplateNode } from "./node";
declare class Parser {
    index: number;
    template: string;
    stack: TemplateNode[];
    root: TemplateNode;
    constructor(template: string);
    match(pattern: string): boolean;
    current(): TemplateNode;
    read(pattern: string): boolean;
    read_until(pattern: RegExp): string;
}
declare function parse(str: string): TemplateNode;
export { Parser, parse };
