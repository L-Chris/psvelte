import { TemplateNode } from "./interfaces";
interface ParserAST {
    html: TemplateNode;
    css: TemplateNode[];
}
declare class Parser {
    index: number;
    template: string;
    stack: TemplateNode[];
    html: TemplateNode;
    css: TemplateNode[];
    constructor(template: string);
    match(pattern: string): boolean;
    current(): TemplateNode;
    read(pattern: string): boolean;
    read_until(pattern: RegExp): string;
    allow_whitespace(): void;
}
declare function parse(str: string): ParserAST;
export { ParserAST, Parser, parse };
