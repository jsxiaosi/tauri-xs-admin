// 存储副作用函数
const bucket = new WeakMap<any, Map<string, Set<Function>>>();

// 激活副作用函数
let activeEffect: Function | null = null;

// 原始数据
const data = {
  name: 'dahuang',
  age: 18,
  get bar() {
    return this.age;
  },
};

function track<T extends Object>(target: T, key: keyof T) {
  // 没有 activeEffect，直接返回
  if (!activeEffect) return target[key];
  // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key --> effects
  let depsMap = bucket.get(target);

  // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
  // 里面存储着所有与当前 key 相关联的副作用函数：effects
  let deps = depsMap.get(key as string);

  // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
  if (!deps) {
    depsMap.set(key as string, (deps = new Set()));
  }

  // 最后将当前激活的副作用函数添加到“桶”里
  deps.add(activeEffect);
}

function trigger<T extends Object>(target: T, key: keyof T) {
  // 根据 target 从桶中取得 depsMap，它是 key --> effects
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  // 根据 key 取得所有副作用函数 effects
  const effects = depsMap.get(key as string);

  // 执行副作用函数
  effects && effects.forEach((fn) => fn());
}

// 对原始数据的代理
export function reactive<T extends object>(target: T) {
  return new Proxy<T>(target, {
    // 拦截读取操作
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      // 依赖收集
      track<T>(target, key as keyof T);
      return res;
    },

    // 拦截设置操作
    set(target, key, newVal, receiver) {
      // 设置属性值
      const res = Reflect.set(target, key, newVal, receiver);
      // 派发更新
      trigger<T>(target, key as keyof T);
      return res;
    },
  });
}

export function effect(fn: Function) {
  activeEffect = fn;

  fn();

  activeEffect = null;
}

const obj = reactive(data);

effect(() => {
  console.log(obj.bar);
});

// 1 秒后修改响应式数据
setTimeout(() => {
  obj.age = 23;
}, 1000);
