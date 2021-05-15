import React, {Component} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import LaporanCafeJurnalService from "../services/LaporanCafeJurnalService";

const columns = [{
    dataField: 'id',
    text: 'ID'
}, {
    dataField: 'tgl_transaksi',
    text: 'Tgl Transaksi'
}, {
    dataField: 'nama_transaksi',
    text: 'Nama Transaksi'
}, {
    dataField: 'jenis_transaksi',
    text: 'Akun Kategori'
}, {
    dataField: 'debit',
    text: 'Debit'
}, {
    dataField: 'jumlah_transaksi',
    text: 'Kredit'
}, {
    dataField: 'kode_transaksi',
    text: 'Kode Transaksi'
}, {
    dataField: 'bayar',
    text: 'Bayar'
}, {
    dataField: 'kembali',
    text: 'Kembali'
}, {
    dataField: 'total_transaksi',
    text: 'Total Transaksi'
}, {
    dataField: 'nama',
    text: 'Nama Customer'
}, {
    dataField: 'email',
    text: 'Email Customer'
}, {
    dataField: 'telp',
    text: 'No Whatsapp'
}, {
    dataField: 'created_date',
    text: 'Created Date'
}, {
    dataField: 'created_by',
    text: 'Created By'
}

];


class LaporanCafeJurnal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laporan:''
        }
    }

    componentDidMount() {
        LaporanCafeJurnalService.getLaporan().then(res => {
            console.log(res.data.data)
            this.setState({
                laporan:res.data.data.result
            })
        })
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div><h3>Laporan Cafe Jurnal</h3></div>
                <br/>
                <BootstrapTable
                    keyField='id'
                    data={this.state.laporan}
                    columns={columns}
                    striped
                    hover
                    condensed/>
            </div>
        );
    }
}

export default LaporanCafeJurnal
