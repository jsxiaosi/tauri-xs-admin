import { test, expect } from 'vitest';
import HelloWorld from '../src/components/HelloWorld.vue';
import { mount } from '@vue/test-utils';

test('HelloWorld', () => {
  console.log(HelloWorld);
  const wrapper = mount(HelloWorld);
  expect(wrapper.text()).toContain('Documentation');
});
