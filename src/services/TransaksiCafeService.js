import axios from "axios";
import xtoken from "./auth/x.token";

class TransaksiCafeService{
    getListMenu(page, size) {
        return axios.get('https://vklaim.com/ci_fazri/ci_api/cafe_master/', {
            headers:xtoken(),
            params:{
                tipe:'MENU',
                offset:0,
            }
        })
    }
    getListOperator(page, size) {
        return axios.get('https://vklaim.com/ci_fazri/ci_api/cafe_master/', {
            headers:xtoken(),
            params:{
                tipe:'OPERATOR',
                offset:0,
            }
        })
    }

    postOrder(data) {
        // console.log(data)
        return axios.post('https://vklaim.com/ci_fazri/ci_api/cafe_jurnal_transaksi', data,{
            headers: xtoken(),
        })
    }
}

export default new TransaksiCafeService()