import React, {Component} from 'react';
import {featureListType} from './featureListType';

export default class FeatureSwitchRoot extends Component {
    static propTypes = {
        featureList: featureListType
    }

    static childContextTypes = {
        featuresList: featureListType
    }

    getChildContext = () => {
        return {featuresList: this.props.featureList};
    }

    render () {
        return (
            <div>{this.props.children}</div>
        );
    }
}