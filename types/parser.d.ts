import { Node } from "./node";
declare class Parser {
    index: number;
    template: string;
    stack: Node[];
    root: Node;
    constructor(template: string);
    match(pattern: string): boolean;
    current(): Node;
    read(pattern: string): boolean;
    read_until(pattern: RegExp): string;
}
declare function parse(str: string): Node;
export { Parser, parse };
