import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import TsxComponents from '../src/components/TsxComponents';

test('HelloWorld', () => {
  const wrapper = mount(TsxComponents);
  expect(wrapper.text()).toContain('admin');
});
