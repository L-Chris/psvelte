import { TemplateNode, StyleTemplateNode } from "./node";
interface ParserAST {
    html: TemplateNode;
    css: StyleTemplateNode[];
}
declare class Parser {
    index: number;
    template: string;
    stack: TemplateNode[];
    html: TemplateNode;
    css: StyleTemplateNode[];
    constructor(template: string);
    match(pattern: string): boolean;
    current(): TemplateNode;
    read(pattern: string): boolean;
    read_until(pattern: RegExp): string;
}
declare function parse(str: string): ParserAST;
export { ParserAST, Parser, parse };
