interface Node {
    start: number;
    end: number;
    name: string;
    type: string;
    children?: Node[];
}
declare function parse(str: string): Node;
export { parse };
