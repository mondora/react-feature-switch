import React, {Component, PropTypes} from 'react';

export default class FeatureSwitchRoot extends Component {
    static propTypes = {
        featureList: PropTypes.shape({
            featureName: PropTypes.string.isRequired,
            enable: PropTypes.bool.isRequired
        })
    }

    static childContextTypes = {
        featuresList: PropTypes.shape({
            featureName: PropTypes.string.isRequired,
            enable: PropTypes.bool.isRequired
        })
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