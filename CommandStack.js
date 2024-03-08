export class CommandStack {
	constructor() {
		this.stack = [];
		this.stackIndex = -1;
	}

	execute(command) {
		console.log('-------------------');
		console.log(this.stack.length);
		console.log('-------------------');
		this.stack.splice(this.stackIndex + 1);
		console.log('-------------------');
		console.log(command);
		console.log('-------------------');
		this.stack.push(command);
		command.execute(command.value);
		this.stackIndex++;
		console.log('-------------------');
		console.log(this.stack.length);
		console.log('-------------------');
	}

	undo() {
		if (this.stackIndex >= 0) {
			const command = this.stack[this.stackIndex--];
			console.log('-------------------');
			console.log(command);
			console.log('-------------------');
			command.undo(command.value);
		}
	}

	redo() {
		if (this.stackIndex < this.stack.length - 1) {
			const command = this.stack[++this.stackIndex];
			console.log('-------------------');
			console.log(command);
			console.log('-------------------');
			command.execute(command.value);
		}
	}
}
