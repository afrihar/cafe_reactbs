import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

class TransaksiGudang extends Component {
    state = {
        startDate: new Date()
    };

    render() {
        const { startDate } = this.state;
        return <DatePicker
            selected={startDate}
            onChange={date => this.setState({
                startDate: date
            })}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            timeIntervals={1}
        />;
    }

    handleChange = startDate => {
        this.setState({
            startDate
        });
    };
}

export default TransaksiGudang;