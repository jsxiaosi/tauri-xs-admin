import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TsxComponents from '../src/components/TsxComponents';

test('HelloWorld', () => {
  const wrapper = mount(TsxComponents);
  expect(wrapper.text()).toContain('admin');
});
