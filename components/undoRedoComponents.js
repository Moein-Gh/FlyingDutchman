export let orderUndoRedo = (order) => {
	return `
    <div class="order-undo-redo">
      <button class="orderButton undoButton" id="undo">↩</button>
      <button class="orderButton" id="redo">↪</button>
      <button class="orderButton clearButton" id="redo">Clear</button>
     
    </div>
    `;
};
