import React, {Component, PropTypes} from 'react';
import chai, {expect} from 'chai';
import {mount} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import FeatureSwitch from '../../src/components/FeatureSwitch';
import FeatureNext from '../../src/components/FeatureNext';
import FeatureCurrent from '../../src/components/FeatureCurrent';
import jsdom from 'jsdom'

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;


chai.use(chaiEnzyme());

describe('FeatureSwitch', () => {
    it('should render nothing if none FeatureNext or FeatureCurrent are passed as children', () => {
        const component = mount(
            <FeatureSwitch featureName='feature'>
                <div className='iAmInvisible'>test</div>
                <div className='iAmInvisible'>test</div>
            </FeatureSwitch>);
        expect(component.find('.iAmInvisible')).to.have.length(0);
    });
    it('should render nothing except FeatureNext components because passed feature is enable', () => {
        const RootComponent = class FeatureNext extends Component {
            static childContextTypes = {
                featuresList: PropTypes.shape({
                    featureName: PropTypes.string.isRequired,
                    enable: PropTypes.bool.isRequired
                })
            }
            getChildContext = () => {
                return {featuresList: [{featureName: 'feature1', enable: true}]};
            }
            render () {
                return <div>{this.props.children}</div>;
            }
        };
        const component = mount(
            <RootComponent>
                <div>
                    <FeatureSwitch featureName='feature1'>
                        <FeatureNext/>
                        <div className='iAmInvisible'>test</div>
                        <FeatureCurrent/>
                        <div className='iAmInvisible'>test</div>
                    </FeatureSwitch>
                </div>
            </RootComponent>);
        expect(component.find('.iAmInvisible')).to.have.length(0);
        expect(component.find('.featureCurrent')).to.have.length(0);
        expect(component.find('.featureNext')).to.have.length(1);
    });
    it('should render nothing except FeatureCurrent components because passed feature is not enable', () => {
        const RootComponent = class FeatureNext extends Component {
            static childContextTypes = {
                featuresList: PropTypes.shape({
                    featureName: PropTypes.string.isRequired,
                    enable: PropTypes.bool.isRequired
                })
            }
            getChildContext = () => {
                return {featuresList: [{featureName: 'feature1', enable: false}]};
            }
            render () {
                return <div>{this.props.children}</div>;
            }
        };
        const component = mount(
            <RootComponent>
                <div>
                    <FeatureSwitch featureName='feature1'>
                        <FeatureNext/>
                        <div className='iAmInvisible'>test</div>
                        <FeatureCurrent/>
                        <div className='iAmInvisible'>test</div>
                    </FeatureSwitch>
                </div>
            </RootComponent>);
        expect(component.find('.iAmInvisible')).to.have.length(0);
        expect(component.find('.featureCurrent')).to.have.length(1);
        expect(component.find('.featureNext')).to.have.length(0);
    });
});
describe('isFeatureEnable', () => {
    it('should return false if feature is not present in feature list', () => {
        expect(FeatureSwitch.isFeatureEnable('feature1', [])).to.be.false;
    });
    it('should return false if featureList is undefined or is not and array', () => {
        expect(FeatureSwitch.isFeatureEnable('feature1')).to.be.false;
        expect(FeatureSwitch.isFeatureEnable('feature1', 'featureList')).to.be.false;
    });
    it('should return false if feature is present in featureList but it is not enable', () => {
        expect(FeatureSwitch.isFeatureEnable('feature1', [{featureName: 'feature1', enable: false}])).to.be.false;
    });
    it('should return true if feature is present in featureList and it is enable', () => {
        expect(FeatureSwitch.isFeatureEnable('feature1', [{featureName: 'feature1', enable: true}])).to.be.true;
    });
});