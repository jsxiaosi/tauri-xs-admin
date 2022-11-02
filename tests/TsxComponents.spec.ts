import { test, expect } from 'vitest';
import TsxComponents from '../src/components/TsxComponents';
import { mount } from '@vue/test-utils';

test('HelloWorld', () => {
  const wrapper = mount(TsxComponents);
  expect(wrapper.text()).toContain('admin');
});
