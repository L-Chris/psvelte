let currentComponent;

export class SvelteComponent {
	target: Node
	on_create: Array<() => any>
	on_mount: Array<() => any>

	constructor(target: Node) {
		currentComponent = this

		this.target = target
		this.on_create = []
		this.on_mount = []

		this.render()
	}

	createFragment() {}

	render() {
		this.on_create.forEach(fn => fn.apply(this, null))

		this.createFragment()

		setTimeout(() => {
			this.on_mount.forEach(fn => fn.apply(this, null))
		}, 0)
	}
}

export function onCreate(fn: () => any) {
	currentComponent.on_create.push(fn)
}

export function onMount(fn: () => any) {
	currentComponent.on_mount.push(fn)
}
