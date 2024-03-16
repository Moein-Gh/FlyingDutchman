export let orderUndoRedo = (order) => {
	return `
    <div class="order-undo-redo">
      <button class="order-undo" id="undo">↩</button>
      <button class="order-redo" id="redo">↪</button>
    </div>
    `;
};
