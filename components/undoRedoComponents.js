import { dictionary } from '../dictionary.js';
export let orderUndoRedo = (order) => {
	return `
    <div class="order-undo-redo">
      <button class="orderButton undoButton" id="undo">↩</button>
      <button class="orderButton" id="redo">↪</button>
      <button class="orderButton clearButton" id="redo">${dictionary.Clear[sessionStorage.getItem('language') || 'en']}</button>
     
    </div>
    `;
};
