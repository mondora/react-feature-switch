import React, {Component, PropTypes} from 'react';
import FeatureCurrent from './FeatureCurrent';
import FeatureNext from './FeatureNext';
import {featureListType} from './featureListType';

export default class FeatureSwitch extends Component {
    static propTypes = {
        featureName: PropTypes.string.isRequired
    }

    static contextTypes = {
        featuresList: featureListType
    }

    static isFeatureEnable = (featureName, featureList) => {
        if (featureList && Array.isArray(featureList) && featureList.length > 0) {
            return featureList.filter(item => item.featureName === featureName && item.enable).length > 0;
        }
        return false;
    }

    render () {
        const {children, featureName} = this.props;
        const {featuresList} = this.context;
        const isCurrentFeatureEnable = FeatureSwitch.isFeatureEnable(featureName, featuresList);

        if (process.env.NODE_ENV === 'test') {
            return <div>{children}</div>;
        } else {
            if (Array.isArray(children)) {
                const childernAsArray = React.Children.toArray(children);
                const res = childernAsArray.filter(item => {
                    // console.log(isCurrentFeatureEnable);
                    // console.log(item.type);
                    return (item.type === FeatureCurrent && !isCurrentFeatureEnable) ||
                    (item.type === FeatureNext && isCurrentFeatureEnable);
                });
                return res.length > 0? <div>{res}</div>: <div></div>;
            } else {
                return (children.type === FeatureCurrent && !isCurrentFeatureEnable) ||
                    (children.type === FeatureNext && isCurrentFeatureEnable)? children: <div></div>;
            }
        }
    }
}
