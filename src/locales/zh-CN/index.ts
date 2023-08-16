import { defaultFilePath } from '../utils';

const config: Recordable = import.meta.glob('./modules/*.ts', { eager: true });

export const name = '中文简体';

export default defaultFilePath(config);
