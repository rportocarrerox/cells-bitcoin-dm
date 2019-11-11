const {html, } = Polymer;

class CellsBitcoinDm extends Polymer.Element {

  static get is() {
    return 'cells-bitcoin-dm';
  }

  static get properties() {
    return {
      bpiArray: { type: Array, value: [] }
    };
  }

  ready() {
    super.ready();
    this._getPriceBitcoinList();
  }

  _getPriceBitcoinList() {
    let path = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    this._doRq(path);

  }

  _doRq(endPoint) {
    this.$.bitcoindp.host = endPoint;
    this.$.bitcoindp.generateRequest();
  }

  _rqSuccess(evt) {
    let data = evt.detail;
    this.bpiArray.push(data.bpi.USD);
    this.bpiArray.push(data.bpi.GBP);
    this.bpiArray.push(data.bpi.EUR);
    console.table(this.bpiArray);
    let arreglo = this.bpiArray;
    let enviar = [];
    arreglo.forEach(function(item) {
    let objPadre = new Object();
    let cells = [];
     let obj = new Object();
     obj.label = item.code;
     obj.isHeader = true;
     let obj2 = new Object();
     obj2.label = item.rate;
    let obj3= new Object();
     obj3.label = item.description;
     cells.push(obj);
     cells.push(obj2);
     cells.push(obj3);
    objPadre.cells=cells;
     enviar.push(objPadre);
    });
    console.log(enviar);
    console.table(enviar);
    // cells: [
    //   {label: 'orange', isHeader: true},
    //   {label: 77.1},
    //   {label: 1.8},
    //   {label: 5.7},
    //   {label: 95.8}
    // ]
    this.dispatchEvent(new CustomEvent('bitcoint-price-changed', {
      composed: true,
      bubbles: true,
      detail: enviar
    }));
  }

  _rqError(err) {
    console.log(err);
  }

  static get template() {
    return html`
      <cells-generic-dp
        id = "bitcoindp"
        method = "GET"
        on-request-success="_rqSuccess"
        on-request-error="_rqError">
      </cells-generic-dp>
    `;
  }

  getData() {
    if (!this.initialLoadHandled) {
      this._doRqLogin();
    }
  }

  _doRqLogin(path, type = 'login-request-start') {
    this.$.bitcoindp.generateRequest();
    this.dispatchEvent(new CustomEvent(type));
  }

  _onRqOk(evt) {
    const data = evt.detail.results[0];
    this.dispatchEvent(new CustomEvent('login-request-ok', {detail: data}));
  }

  _onRqError(err) {
    this.dispatchEvent(new CustomEvent('login-request-error'));
  }

}

customElements.define(CellsBitcoinDm.is, CellsBitcoinDm);
