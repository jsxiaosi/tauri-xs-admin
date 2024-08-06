import type { TableColumnCtx } from 'element-plus';

export interface TableColumnProps<T extends Recordable = Recordable>
  extends Partial<Omit<TableColumnCtx<T>, 'prop' | 'children'>> {
  isSlots?: boolean;
  prop?: keyof T;
  render?: (row: any) => JSX.Element;
  render_header?: (row: any) => JSX.Element;
  children?: TableColumnProps<T>[];
}
