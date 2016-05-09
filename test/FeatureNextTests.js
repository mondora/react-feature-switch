import React from 'react';
import chai, {expect} from 'chai';
import {mount} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import FeatureNext from '../src/FeatureNext';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

chai.use(chaiEnzyme());

describe('FeatureNext', () => {
    it('should render children', () => {
        const component = mount(
            <FeatureNext>
                <div className='iAmVisible'>test</div>
                <div className='iAmVisible'>
                    <div className='iAmVisible'></div>
                    <div className='iAmVisible'></div>
                </div>
            </FeatureNext>);
        expect(component.find('.iAmVisible')).to.have.length(4);
    });
});