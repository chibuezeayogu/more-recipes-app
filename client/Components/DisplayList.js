import React, { Component } from 'react';
import { Link } from 'react-router';

const Displaylist = React.createClass ({
    render(){
        const { recipes } = this.props;
        return(
            <td>
                list ingradients
            </td>
        );
    }
});

export default Displaylist;