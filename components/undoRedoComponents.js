export let orderUndoRedo = (order) => {
	return `
    <div class="order-undo-redo">
      <button class="order-undo" id="undo">Undo</button>
      <button class="order-redo" id="redo">Redo</button>
    </div>
    `;
};
