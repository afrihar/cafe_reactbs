import React from 'react';

const TransaksiCafe = React.lazy(() => import('../pages/TransaksiCafe'));
const LaporanCafeJurnal = React.lazy(() => import('../pages/LaporanCafeJurnal'));
const MasterMenu = React.lazy(() => import('../pages/MasterMenu'));
const VoucherCafe = React.lazy(() => import('../pages/VoucherCafe'));
const TransaksiGudang = React.lazy(() => import('../pages/TransaksiGudang'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/transaksi', name: 'Transaksi Cafe', component: TransaksiCafe },
    { path: '/laporan', name: 'Transaksi Cafe', component: LaporanCafeJurnal },
    { path: '/master', name: 'Transaksi Cafe', component: MasterMenu },
    { path: '/voucher', name: 'Transaksi Cafe', component: VoucherCafe },
    { path: '/gudang', name: 'Transaksi Cafe', component: TransaksiGudang },
];

export default routes;
