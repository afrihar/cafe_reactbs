import axios from "axios";
import xtoken from "./auth/x.token";

class LaporanCafeJurnalService {
    getLaporan(page, size) {
        return axios.get('https://vklaim.com/ci_fazri/ci_api/cafe_jurnal_transaksi', {
            headers:xtoken(),
            params:{
                tgl_start:'2021-05-01',
                tgl_end:'2021-05-31',
                offset:0,
                limit:10,
                order_dir:'asc'
            }
        })
    }
}

export default new LaporanCafeJurnalService()