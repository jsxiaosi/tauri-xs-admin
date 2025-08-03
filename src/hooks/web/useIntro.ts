// https://introjs.com/docs

import intro from 'intro.js';
import type { TourOptions } from 'intro.js/src/packages/tour/option';
import 'intro.js/minified/introjs.min.css';

async function useIntro(options: Partial<TourOptions> = {}) {
  intro()
    .setOptions({
      ...{
        prevLabel: '上一步',
        nextLabel: '下一步',
        skipLabel: '跳过',
        doneLabel: '结束',
        tooltipPosition: 'bottom' /* 引导说明框相对高亮说明区域的位置 */,
        tooltipClass: 'custom-intro-tooltip' /* 引导说明文本框的样式 */,
        highlightClass: 'custom-intro-highlight' /* 说明高亮区域的样式 */,
        exitOnEsc: true /* 是否使用键盘Esc退出 */,
        exitOnOverlayClick: false /* 是否允许点击空白处退出 */,
        showStepNumbers: false /* 是否显示说明的数据步骤*/,
        keyboardNavigation: true /* 是否允许键盘来操作 */,
        showButtons: true /* 是否按键来操作 */,
        showBullets: true /* 是否使用点点点显示进度 */,
        showProgress: false /* 是否显示进度条 */,
        scrollToElement: true /* 是否滑动到高亮的区域 */,
        overlayOpacity: 0.8 /* 遮罩层的透明度 */,
        positionPrecedence: ['bottom', 'top', 'right', 'left'] /* 当位置选择自动的时候，位置排列的优先级 */,
        disableInteraction: true /* 是否禁止与元素的相互关联 */,
        hintPosition: 'top-middle' /* 默认提示位置 */,
        hintButtonLabel: '默认提示内容' /* 默认提示内容 */,
        steps: [
          {
            title: '欢迎',
            intro: '懒得做中英翻译，自行解决 👋',
          },
          {
            title: '导航栏',
            element: '.sidebar-container',
            intro: '这是导航栏',
          },
          {
            title: '折叠按钮',
            element: '.breadcrumb-fold',
            intro: '这是折叠按钮',
          },
          {
            title: '操作',
            element: '.navbar-right',
            intro: '功能区',
          },
        ],
      },
      ...options,
    })
    .start();
}

export default useIntro;
