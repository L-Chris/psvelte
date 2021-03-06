export declare const append: (target: Node, node: Node) => Node;
export declare const insert: (target: Node, node: Node) => Node;
export declare const detach: (node: Node) => Node;
export declare const element: (tagName: string) => HTMLElement;
export declare const text: (data: string) => Text;
export declare const attr: (target: Element, name: string, value: string) => void;
export declare const styleElement: (content: string) => HTMLElement;
