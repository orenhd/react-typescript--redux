import React from 'react';
import { shallow } from 'enzyme';

import { ClickingExample } from './clickingExample';

import * as dataModels from './clickingExample.dataModels';

describe('clickingExample', () => {
  it('should render correctly', () => {

    const clickingData: dataModels.ClickingData = {
      [dataModels.ClickCountTypes.homeButtonClick]: 3,
      [dataModels.ClickCountTypes.homeButtonClickOutside]: 4,
    }

    const component = shallow(<ClickingExample
      userName='Worlds'
      clickingData={clickingData}
      setUserName={jest.fn()}
      updateClickingData={jest.fn()}
    />);

    expect(component).toMatchSnapshot();
  });
});