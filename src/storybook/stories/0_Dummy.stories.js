import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import RequestNetworkProvider from "@requestnetwork/react-components";

export const RequestNetworkWrapper = storyFn => (
  <RequestNetworkProvider onInit={action('connected')}>
    {storyFn()}
  </RequestNetworkProvider>
);
addDecorator(RequestNetworkWrapper)

storiesOf('Dummy', module).add('Hello', () => 'Hello World');
