import React, {Component, PropTypes} from 'react';

export default class FeatureNext extends Component {
    render () {
        return (
            <div className='featureNext'>{this.props.children}</div>
        );
    }
}