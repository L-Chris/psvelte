import { Parser } from './parser';
interface TemplateNode {
    start: number;
    end: number;
    name?: string;
    type: string;
    content?: string;
    children?: TemplateNode[];
}
interface FragmentNode extends TemplateNode {
    id?: string;
    parentId: string;
    parentType: string;
}
interface TextTemplateNode extends TemplateNode {
    content: string;
}
declare function fragment(parser: Parser): void;
export { TemplateNode, TextTemplateNode, FragmentNode, fragment };
