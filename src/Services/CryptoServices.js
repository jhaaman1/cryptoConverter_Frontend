import axios from "axios";

class CryptoServices {
  static getCryptocurrencies() {
    return axios({
      method: "get",
      url: "https://crypto-converter-olr4.onrender.com/cryptocurrencies",
    });
  }

  static convertCurrency(sourceCrypto, amount, targetCurrency) {
    return axios({
      method: "get",
      url: `https://crypto-converter-olr4.onrender.com/convert?sourceCrypto=${sourceCrypto}&amount=${amount}&targetCurrency=${targetCurrency}`,
    });
  }
}

export default CryptoServices;
