// Sheng-Yu

export function renderTableOrder(data) {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
    <div class="Yu-orderPageTitle">
        <button>← Back To Table</button>
        <h1>Order 1/ Table 1</h1>
    </div>
    <!-- <h1 class="Yu-orderPageTitle">{Order}/ {Table}</h1> -->

    <section class="Yu-orderSectionContainer">
        <!-- Order List Table -->
        <div class="Yu-orderTableContainer">
            <table>
                <colgroup>
                    <col style="width: 10%; ">
                    <col style="width: 30%; ">
                    <col style="width: 20%; ">
                    <col style="width: 10%; ">
                    <col style="width: 20%; ">
                    <col style="width: 10%; ">
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ITEM</th>
                        <th>Oty</th>
                        <th>Price</th>
                        <th>Comment</th>
                        <th>Del</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                    <tr>
                        <td>No.1</td>
                        <td>Bear</td>
                        <td>
                            <div>
                                <button onclick="">+</button>
                                <h3>22</h3><button onclick="">-</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="32">
                            </div>
                        </td>
                        <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
                        <td><button onclick="">Del</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Total Price/ Split Bill/Submit/ Checkout -->
        <div class="Yu-orderSectionBottomContainer">
            <div class="Yu-orderSectionBottomRow_1">
                <h1>Total: &nbsp;</h1>
                <h1>$100</h1>
            </div>
            <div class="Yu-orderSectionBottomRow_2">
                <h1>Split Bill</h1>
                <input name="splitBillPpl" value="10">
                <h1>ppl.</h1>
            </div>
            <div class="Yu-orderSectionBottomRow_3">
                <button>Save & Submit</button>
                <button>Checkout</button>
            </div>

        </div>



    </section>
  `;
}
