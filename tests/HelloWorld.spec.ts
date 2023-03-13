import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from '../src/components/HelloWorld.vue';

test('HelloWorld', () => {
  console.log(HelloWorld);
  const wrapper = mount(HelloWorld);
  expect(wrapper.text()).toContain('Documentation');
});
