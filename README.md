[![npm version](https://badge.fury.io/js/react-feature-switch.svg)](https://badge.fury.io/js/react-feature-switch)
[![Build Status](https://travis-ci.org/mondora/react-feature-switch.svg?branch=master)](https://travis-ci.org/mondora/react-feature-switch)
[![Coverage Status](https://coveralls.io/repos/github/mondora/react-feature-switch/badge.svg?branch=master)](https://coveralls.io/github/mondora/react-feature-switch?branch=master)
[![Dependency Status](https://david-dm.org/mondora/react-feature-switch.svg)](https://david-dm.org/mondora/react-feature-switch)
[![devDependency Status](https://david-dm.org/mondora/react-feature-switch/dev-status.svg)](https://david-dm.org/mondora/react-feature-switch#info=devDependencies)

React component to handle feature toggles

## Install

`npm install --save react-feature-switch`

## Components

### FeatureSwitchRoot
used to store in context features list

### FeatureSwitch
local component to handle feature

### FeatureNext
component that wraps feature that should be shown if current feature is enable

### FeatureCurrent
component that wraps feature that should not be shown if current feature is disable

## Use

```js
const featureList=[
    {
        featureName: 'myFeature1',
        enable: true
    },
    {
        featureName: 'myFeature2',
        enable: false
    }
];
```
```xml
<FeatureSwitchRoot featureList={featureList}>
    <div>
        <!-- some other elements -->
        <FeatureSwitch featureName='myFeature1'>
            <FeatureNext>
                this is something to render if current feature is enable
            </FeatureNext>
            <FeatureCurrent>
                this is something to render if current feature is disable
            </FeatureCurrent>
        </FeatureSwitch>
        <!-- some other elements -->
    </div>
</FeatureSwitchRoot>);
```
## Test environment
if NODE_ENV is set to test, all children of FeatureSwitchRoot are rendered
