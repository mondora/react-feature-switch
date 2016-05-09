import React from 'react';
import chai, {expect} from 'chai';
import {mount} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import FeatureCurrent from '../src/FeatureCurrent';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

chai.use(chaiEnzyme());

describe('FeatureCurrent', () => {
    it('should render children', () => {
        const component = mount(
            <FeatureCurrent>
                <div className='iAmVisible'>test</div>
                <div className='iAmVisible'>
                    <div className='iAmVisible'></div>
                    <div className='iAmVisible'></div>
                </div>
            </FeatureCurrent>);
        expect(component.find('.iAmVisible')).to.have.length(4);
    });
});