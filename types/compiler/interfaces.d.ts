export interface TemplateNode {
    start: number;
    end: number;
    name?: string;
    type: string;
    content?: string;
    attributes?: Attribute[];
    children?: TemplateNode[];
}
export interface FragmentNode extends TemplateNode {
    id?: string;
    parentId: string;
    parentType: string;
}
export interface Attribute extends TemplateNode {
    value?: any;
}
