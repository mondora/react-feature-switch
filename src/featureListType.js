import {PropTypes} from 'react';

export const featureListType = PropTypes.arrayOf(PropTypes.shape({
    featureName: PropTypes.string.isRequired,
    enable: PropTypes.bool.isRequired
}));