import React from 'react';
import chai, {expect} from 'chai';
import {mount} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import FeatureSwitchRoot from '../src/FeatureSwitchRoot';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

chai.use(chaiEnzyme());

describe('FeatureSwitchRoot', () => {
    it('should render children', () => {
        const component = mount(
            <FeatureSwitchRoot featureList={[{featureName: 'feature1', enable: false}]}>
                <div className='iAmVisible'>test</div>
                <div className='iAmVisible'>
                    <div className='iAmVisible'></div>
                    <div className='iAmVisible'></div>
                </div>
            </FeatureSwitchRoot>);
        expect(component.find('.iAmVisible')).to.have.length(4);
    });
});