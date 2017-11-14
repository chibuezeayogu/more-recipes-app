import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { Footer } from 'react-materialize';


class BottomFooter extends  Component {
    render() {
        return (
            <div>
                <Footer copyrights="&copy 2017 Copyright Text"
                moreLinks={
                    <a className="grey-text text-lighten-4 right" href="#!">Andela Project by Ayogu Chibueze></a>
                }
                
                className='black'
            >
                    
                </Footer>;
            </div>
        );
    }
}

BottomFooter.propTypes = {
    logout: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    className: PropTypes.string,
    copyrights: PropTypes.string,
};

export default BottomFooter;