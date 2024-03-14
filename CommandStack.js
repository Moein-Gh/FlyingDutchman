export class CommandStack {
	constructor() {
		this.stack = [];
		this.stackIndex = -1;
	}

	execute(command) {
		this.stack.splice(this.stackIndex + 1);
		this.stack.push(command);
		command.execute(command.value);
		this.stackIndex++;
	}

	undo() {
		if (this.stackIndex >= 0) {
			const command = this.stack[this.stackIndex--];
			command.undo(command.undoValue);
		}
	}

	redo() {
		if (this.stackIndex < this.stack.length - 1) {
			const command = this.stack[++this.stackIndex];
			command.execute(command.value);
		}
	}
}
