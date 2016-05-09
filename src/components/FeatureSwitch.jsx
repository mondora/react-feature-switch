import React, {Component, PropTypes} from 'react';
import FeatureCurrent from './FeatureCurrent';
import FeatureNext from './FeatureNext';

export default class FeatureSwitch extends Component {
    static propTypes = {
        featureName: PropTypes.string.isRequired
    }

    static contextTypes = {
        featuresList: PropTypes.shape({
            featureName: PropTypes.string.isRequired,
            enable: PropTypes.bool.isRequired
        })
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
                console.log('isCurrentFeatureEnable');
                // console.log(isCurrentFeatureEnable);
                // console.log(item.type);
                console.log((item.type === FeatureCurrent && !isCurrentFeatureEnable) ||
                    (item.type === FeatureNext && isCurrentFeatureEnable));
                return (item.type === FeatureCurrent && !isCurrentFeatureEnable) ||
                (item.type === FeatureNext && isCurrentFeatureEnable);
            });
            console.log('res.length');
            console.log(res.length);
            return res.length > 0? <div>{res}</div>: <div></div>;
        } else {
            return children.type === FeatureCurrent || children.type === FeatureNext? children: <div></div>;
        }
    }
}
