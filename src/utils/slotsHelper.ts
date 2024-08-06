import type { Slots } from 'vue';
import { isFunction } from '@jsxiaosi/utils';

export function getSlot<T extends Object = any>(slots: Slots, slot = 'default', data?: T) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  return slotFn(data);
}
