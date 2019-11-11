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
    this.dispatchEvent(new CustomEvent('bitcoint-price-changed', {
      composed: true,
      bubbles: true,
      detail: this.bpiArray
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
