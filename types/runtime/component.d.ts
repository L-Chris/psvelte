export declare class SvelteComponent {
    target: Node;
    on_create: Array<() => any>;
    on_mount: Array<() => any>;
    constructor(target: Node);
    createFragment(): void;
    render(): void;
}
export declare function onCreate(fn: () => any): void;
export declare function onMount(fn: () => any): void;
