import React from 'react';
import chai, {expect} from 'chai';
import {mount} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import FeatureSwitch from '../src/FeatureSwitch';
import FeatureNext from '../src/FeatureNext';
import FeatureCurrent from '../src/FeatureCurrent';
import FeatureSwitchRoot from '../src/FeatureSwitchRoot';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;


chai.use(chaiEnzyme());

describe('FeatureSwitch', () => {
    it('should render nothing if none FeatureNext or FeatureCurrent are passed as children', () => {
        process.env.NODE_ENV = 'production';

        const component = mount(
            <FeatureSwitch featureName='feature'>
                <div className='iAmInvisible'>test</div>
                <div className='iAmInvisible'>test</div>
            </FeatureSwitch>);
        expect(component.find('.iAmInvisible')).to.have.length(0);
    });
    it('should render nothing except FeatureNext components because passed feature is enable', () => {
        process.env.NODE_ENV = 'production';

        const component = mount(
            <FeatureSwitchRoot featureList={[{featureName: 'feature1', enable: true}]}>
                <FeatureSwitch featureName='feature1'>
                    <FeatureNext/>
                    <div className='iAmInvisible'>test</div>
                    <FeatureCurrent/>
                    <div className='iAmInvisible'>test</div>
                </FeatureSwitch>
            </FeatureSwitchRoot>);
        expect(component.find('.iAmInvisible')).to.have.length(0);
        expect(component.find('.featureCurrent')).to.have.length(0);
        expect(component.find('.featureNext')).to.have.length(1);
    });
    it('should render nothing except FeatureCurrent components because passed feature is not enable', () => {
        process.env.NODE_ENV = 'production';

        const component = mount(
            <FeatureSwitchRoot featureList={[{featureName: 'feature1', enable: false}]}>
                <FeatureSwitch featureName='feature1'>
                    <FeatureNext/>
                    <div className='iAmInvisible'>test</div>
                    <FeatureCurrent/>
                    <div className='iAmInvisible'>test</div>
                </FeatureSwitch>
            </FeatureSwitchRoot>);
        expect(component.find('.iAmInvisible')).to.have.length(0);
        expect(component.find('.featureCurrent')).to.have.length(1);
        expect(component.find('.featureNext')).to.have.length(0);
    });
    it('should not render FeatureNext if is the only FeatureSwitch component and feature is not enable', () => {
        process.env.NODE_ENV = 'production';

        const component = mount(
            <FeatureSwitchRoot featureList={[{featureName: 'feature1', enable: false}]}>
                <FeatureSwitch featureName='feature1'>
                    <FeatureNext/>
                </FeatureSwitch>
            </FeatureSwitchRoot>);
        expect(component.find('.featureNext')).to.have.length(0);
    });
    it('should render FeatureNext if is the only FeatureSwitch component and feature is enable', () => {
        process.env.NODE_ENV = 'production';

        const component = mount(
            <FeatureSwitchRoot featureList={[{featureName: 'feature1', enable: true}]}>
                <FeatureSwitch featureName='feature1'>
                    <FeatureNext/>
                </FeatureSwitch>
            </FeatureSwitchRoot>);
        expect(component.find('.featureNext')).to.have.length(1);
    });
});
describe('FeatureSwitch in test env', () => {
    it('should render all children', () => {
        process.env.NODE_ENV = 'test';

        const component = mount(
            <FeatureSwitchRoot featureList={[{featureName: 'feature1', enable: true}]}>
                <FeatureSwitch featureName='feature1'>
                    <FeatureNext/>
                    <div className='iAmVisible'>test</div>
                    <FeatureCurrent/>
                    <div className='iAmVisible'>test</div>
                </FeatureSwitch>
            </FeatureSwitchRoot>);
        expect(component.find('.featureNext')).to.have.length(1);
        expect(component.find('.featureCurrent')).to.have.length(1);
        expect(component.find('.iAmVisible')).to.have.length(2);
    });
});
describe('isFeatureEnable', () => {
    process.env.NODE_ENV = 'test';
    
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