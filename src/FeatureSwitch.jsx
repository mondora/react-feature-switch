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

    static isComponentToShow = (featureName, featureList) => {

    }

    render () {
        const {children, featureName} = this.props;
        const {featuresList} = this.context;
        if (Array.isArray(children)) {
            const childernAsArray = React.Children.toArray(children);
            const isCurrentFeatureEnable = FeatureSwitch.isFeatureEnable(featureName, featuresList);
            const res = childernAsArray.filter(item => {
                // console.log(isCurrentFeatureEnable);
                // console.log(item.type);
                return (item.type === FeatureCurrent && !isCurrentFeatureEnable) ||
                (item.type === FeatureNext && isCurrentFeatureEnable);
            });
            return res.length > 0? <div>{res}</div>: <div></div>;
        } else {
            return children.type === FeatureCurrent || children.type === FeatureNext? children: <div></div>;
        }
    }
}
