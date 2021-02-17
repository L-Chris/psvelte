import { Parser } from './parser';
interface Node {
    start: number;
    end: number;
    name?: string;
    type: string;
    content?: string;
    children?: Node[];
}
interface TextNode extends Node {
    content: string;
}
declare function fragment(parser: Parser): void;
export { Node, TextNode, fragment };
