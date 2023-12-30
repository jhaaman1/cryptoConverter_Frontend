import axios from "axios";

class AccountServices {
    getCryptocurrencies(){
        return axios({
            method: "get",
            url: "https://crypto-converter-olr4.onrender.com/cryptocurrencies",
            // data: data
            // headers: {
            //   Authorization: ``,
            // },
          });
    }


    convertCurrency(bitcoin, amount, targetCurrency){
        return axios({
            method: "get",
            url: `https://crypto-converter-olr4.onrender.com/convert?sourceCrypto=${bitcoin}&amount=${amount}&targetCurrency=${targetCurrency}`,
            // headers: {
            //   Authorization: ``,
            // },
          });
    }
};

export default AccountServices;