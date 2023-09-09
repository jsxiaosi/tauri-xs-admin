// 按需element样式
import ElementPlus from 'unplugin-element-plus/vite';

export function configAutoElementStylePlugin() {
  return ElementPlus({
    useSource: true,
  });
}
