import { Parser } from './parser';
interface TemplateNode {
    start: number;
    end: number;
    name?: string;
    type: string;
    content?: string;
    children?: TemplateNode[];
}
interface TextTemplateNode extends TemplateNode {
    content: string;
}
declare function fragment(parser: Parser): void;
export { TemplateNode, TextTemplateNode, fragment };
