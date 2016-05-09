import React, {Component, PropTypes} from 'react';

export default class FeatureCurrent extends Component {
    render () {
        return (
            <div className='featureCurrent'>{this.props.children}</div>
        );
    }
}