import React from 'react';
import { shallow } from 'enzyme';

import ClickingPanel from './clickingPanel';

import * as dataModels from '../clickingExample.dataModels';

const shallowRenderByProps = (clickingData: dataModels.ClickingData) => {
  return shallow(<ClickingPanel
    clickingData={clickingData}
    homeButtonClickedHandler={jest.fn()}
    homeButtonClickedOutsideHandler={jest.fn()}
  />);
}

describe('clickingPanel', () => {
  it('should render correctly', () => {

    const clickingData = {
      [dataModels.ClickCountTypes.homeButtonClick]: 3,
      [dataModels.ClickCountTypes.homeButtonClickOutside]: 4,
    }

    const component = shallowRenderByProps(clickingData);

    expect(component).toMatchSnapshot();
  });

  it('single click -should render correctly', () => {

    const clickingData = {
      [dataModels.ClickCountTypes.homeButtonClick]: 1,
    }

    const component = shallowRenderByProps(clickingData);

    expect(component).toMatchSnapshot();
  });

  it('single click outside - should render correctly', () => {

    const clickingData = {
      [dataModels.ClickCountTypes.homeButtonClickOutside]: 1,
    }

    const component = shallowRenderByProps(clickingData);

    expect(component).toMatchSnapshot();
  });
});
