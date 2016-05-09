[![Build Status](https://travis-ci.org/francescobarbera/react-feature-switch.svg?branch=master)](https://travis-ci.org/francescobarbera/react-feature-switch)
[![codecov](https://codecov.io/gh/francescobarbera/react-feature-switch/branch/master/graph/badge.svg)](https://codecov.io/gh/francescobarbera/react-feature-switch)

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