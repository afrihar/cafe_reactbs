import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from "react-bootstrap/Button";
import {Card, Col, Container, Row, Table} from "react-bootstrap";
import TransaksiCafeService from "../services/TransaksiCafeService";
import {numberFormat} from "../helpers/numberformat";
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import {Formik, Form as FormFormik} from 'formik';
import Toast from 'light-toast';


class TransaksiCafe extends Component {
    constructor(props) {
        super(props);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ':' + today.getMinutes();
        this.state = {
            currentDateTime: time,
            startDate: new Date(),
            currentDate: date,
            menu: [],
            harga: '',
            cafe_jurnal:[],
            listTrx: [],
            total_transaksi:'',
            operator:[],
            created_by:'',
            bayar:'',
            kembali:'',
            nama:'',
            email:'',
            telp:'',
            vendor:null,
            tgl_transaksi:'',
            cafe_jenis_transaksi:'MENU',
            jenis_jurnal_transaksi:'KREDIT'
        }
    }

    componentDidMount() {
        TransaksiCafeService.getListOperator().then(res => {
            console.log('OPERATOR', res)
            this.setState({
                operator: res.data.data.result
            })
        })
        TransaksiCafeService.getListMenu().then(res => {
            this.setState({
                menu: res.data.data.result
            })
        })

    }

    setTotalHarga = () => {
        console.log(this.state.listTrx)
        const totalHarga = this.state.listTrx;
        const totalBayar = totalHarga.reduce((totalHarga, harga) => totalHarga + parseInt(harga.harga, 10), 0);
        this.setState({
            total_transaksi:totalBayar
        },() => this.setKembali())
    }

    setKembali = () => {
        this.setState({
            kembali:this.state.total_transaksi - this.state.bayar
        })
    }

    setBayar = (e) => {

        let harga = e.target.value.replace(/[IDR, ]+/g,'');
        console.log('BAYAR', harga)
        this.setState({
            bayar:harga
        },() => this.setState({
            kembali:this.state.total_transaksi - this.state.bayar
        }))

    }

    handleDeleteRow(i) {
        let rows = [...this.state.listTrx]
        rows.splice(i, 1)
        this.setState({
            listTrx: rows
        },() => this.setTotalHarga())

    }

    setBatal = () => {
        this.setState({
            listTrx:[],
            kembali:'',
            total_transaksi:'',
            bayar:'',
        })
    }

    submitForm = (data) =>{
        console.log('SUBMIT',data)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ':' + today.getMinutes();
        TransaksiCafeService.postOrder(data).then(res => {
            Toast.success('Order Berhasil', 300)
            this.setState({
                currentDateTime: time,
                startDate: new Date(),
                currentDate: date,
                listTrx:[],
                cafe_jurnal:[],
                kembali:'',
                total_transaksi:'',
                bayar:'',
            })
        })
    }

    render() {
        const {
            cafe_jenis_transaksi,
            jenis_jurnal_transaksi,
            cafe_jurnal,
            harga,
            nama,
            email,
            telp,
            vendor,
            tgl_transaksi,
            listTrx,
            total_transaksi,
            created_by,
            bayar,
            kembali
        } = this.state
        const defaultMaskOptions = {
            prefix: 'IDR ',
            suffix: '',
            includeThousandsSeparator: true,
            thousandsSeparatorSymbol: ',',
            allowDecimal: true,
            decimalSymbol: '.',
            decimalLimit: 2, // how many digits allowed after the decimal
            integerLimit: 7, // limit length of integer numbers
            allowNegative: false,
            allowLeadingZeroes: false,
            }
        const currencyMask = createNumberMask(defaultMaskOptions)
        const operators = this.state.operator.map((res) => <a key={res.id}><Button variant="outline-secondary"
                            onClick={
                                () => this.setState({
                                    created_by: res.nama,
                                })}
            >
                <b>{res.nama}</b>
            </Button>{' '}</a>)
        const buttons = this.state.menu.map((res, index) => <Col md={6} key={res.id}>
                <br/>
                <Button variant="outline-secondary" style={{width: '100%'}}
                        onClick={
                            () => this.setState({
                                harga: res.harga,
                                listTrx: [...this.state.listTrx, res],
                                cafe_jurnal:[...this.state.cafe_jurnal,{jumlah_transaksi: res.harga, nama_transaksi: res.nama}],
                            },()=> this.setTotalHarga())}
                >
                    <b>{res.nama}</b>
                    <br/>{numberFormat(res.harga)}
                </Button>
                <br/>
            </Col>);
        const rows = this.state.listTrx.map((res, index) => <tr key={res.id}>
                <td>{index + 1}</td>
                <td><Button variant={'danger'} onClick={index => this.handleDeleteRow(index)}>Hapus</Button></td>
                <td>{res.nama}</td>
                <td>{numberFormat(res.harga)}</td>
            </tr>);
        const {startDate} = this.state;
        return (
            <div>
                <Container>
                    <br/>
                    <br/>
                    <br/>
                    <Formik enableReinitialize={true}
                            initialValues={{
                                cafe_jenis_transaksi,
                                jenis_jurnal_transaksi,
                                cafe_jurnal,
                                harga,
                                nama,
                                email,
                                telp,
                                vendor,
                                tgl_transaksi:this.state.currentDate + ' ' + this.state.currentDateTime,
                                listTrx,
                                total_transaksi,
                                created_by,
                                bayar,
                                kembali
                            }}
                            onSubmit={this.submitForm}>
                        {(props) => (
                    <FormFormik >
                    <Row>

                        <Col>
                            <Card>
                                <Card.Header>
                                    Transaksi
                                </Card.Header>
                                <Card.Body>
                                        <Form.Group controlId="formTglTransaksi">
                                            <Form.Label>Tgl Transaksi</Form.Label>
                                            <Form.Control type="text" placeholder="Tgl Transaksi"
                                                          name="tgl_transaksi"
                                                          value={this.state.currentDate + ' ' + this.state.currentDateTime}
                                                          disabled/>
                                        </Form.Group>
                                        <Form.Group controlId="formNamaCustomer">
                                            <Form.Label>Nama Customer</Form.Label>
                                            <Form.Control type="text" placeholder="Nama Customer" name="nama"
                                            onChange={(e) => this.setState({nama:e.target.value})}/>
                                        </Form.Group>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Email" name="email"
                                            onChange={(e) => this.setState({email:e.target.value})}/>
                                        </Form.Group>
                                        <Form.Group controlId="formNomorWA">
                                            <Form.Label>Nomor WA</Form.Label>
                                            <Form.Control type="text" placeholder="Nomor WA" name="telp"
                                            onChange={(e) => this.setState({telp: e.target.value})}/>
                                        </Form.Group>
                                        <Form.Group controlId="formOperator">
                                            <Form.Label>Operator</Form.Label>
                                            <br/>
                                            {operators}
                                        </Form.Group>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header>
                                    Menu
                                </Card.Header>
                                <Card.Body>
                                    <Container>
                                        <Row>
                                            {buttons}
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Header>
                                    Pesanan
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Action</th>
                                            <th>Transaksi</th>
                                            <th>Harga</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {rows}
                                        </tbody>
                                    </Table>
                                    <br/>

                                        <Form.Group controlId="formTotalTransaksi">
                                            <Form.Label>Total Transaksi</Form.Label>
                                            <Form.Control name="total" type="text" placeholder="IDR" value={numberFormat(this.state.total_transaksi)}
                                                          disabled/>
                                        </Form.Group>
                                        <Form.Group controlId="formBayar">
                                            <Form.Label>Bayar</Form.Label>
                                            <Form.Control name="bayar" as={MaskedInput} mask={currencyMask} type="text" placeholder="IDR" value={this.state.bayar} onChange={this.setBayar}/>
                                        </Form.Group>
                                        <Form.Group controlId="formKembali">
                                            <Form.Label>Kembali</Form.Label>
                                            <Form.Control name="kembali" type="text" placeholder="IDR" value={numberFormat(this.state.kembali)} disabled/>
                                        </Form.Group>
                                        <Form.Group controlId="formTransaksi">
                                            <Button variant="primary" type="submit">Simpan</Button>{' '}
                                            <Button variant="outline-danger" onClick={this.setBatal}>Batal</Button>{' '}
                                        </Form.Group>

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                    </FormFormik>)}
                    </Formik>
                    <br/>
                    <br/>
                    <br/>
                </Container>
            </div>
        );
    }
}

export default TransaksiCafe