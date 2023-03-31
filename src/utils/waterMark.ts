// 全局保存 canvas 和 div ，避免重复创建（单例模式）
const globalCanvas = null;
const globalWaterMark = null;

export interface WaterMarkOptions {
  width?: number;
  height?: number;
  rotate?: number;
  fontSize?: string;
  fillStyle?: string;
  textAlign?: CanvasTextAlign;
}

export const waterMarkStyle = `
display: inline-block;
overflow: hidden;
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
pointer-events: none;
background-repeat: repeat;
z-index: 1000;
`;

const domSymbol = Symbol('watermark-dom');

export function createBase64(text: string, options?: WaterMarkOptions) {
  const { width, height, rotate, fontSize, fillStyle, textAlign } = options || {};
  const canvas = globalCanvas || document.createElement('canvas');
  canvas.width = width || 240;
  canvas.height = height || 100;
  const ctx = canvas.getContext('2d'); // 获取画布上下文

  if (ctx && text) {
    ctx.rotate(rotate || (-20 * Math.PI) / 180);
    ctx.font = fontSize || '14px normal';
    ctx.fillStyle = fillStyle || 'rgba(180, 180, 180, 0.3)';
    ctx.textAlign = textAlign || 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 20, canvas.height / 1.5);
  }

  return canvas.toDataURL('image/png');
}

// 设置水印
export function createWaterMarkDom() {
  // 创建 waterMark 父元素
  const waterMark = globalWaterMark || document.createElement('div');
  waterMark.id = domSymbol.toString();
  waterMark.className = `water-mark`;
  waterMark.setAttribute('style', `${waterMarkStyle}`);

  return waterMark;
}
