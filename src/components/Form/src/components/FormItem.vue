<script lang="tsx">
  import { defineComponent, resolveComponent } from 'vue';
  import type { DefineComponent, SetupContext } from 'vue';
  import { getSlot } from '@/utils/slotsHelper';
  import { elComponentItem } from '../../componentMap';
  import type { FormItemRenderProps } from '../../types/from';
  export default defineComponent(
    <T extends Object = any>(props: FormItemRenderProps<T>, { slots }: SetupContext) => {
      const { formItem, formModel } = props;

      function renderComponent() {
        const Comp = resolveComponent(formItem.component) as DefineComponent;
        const childerCompName = elComponentItem[formItem.component];
        if (childerCompName) {
          return (
            <Comp v-model={formModel[formItem.prop]} {...formItem.props}>
              {childrenComponent(childerCompName)}
            </Comp>
          );
        } else {
          return <Comp v-model={formModel[formItem.prop]} {...formItem.props} />;
        }
      }

      function childrenComponent(compName: string) {
        if (formItem.childrenComponent) {
          const { options } = formItem.childrenComponent;

          const Comp = resolveComponent(compName) as DefineComponent<Recordable>;
          return (
            <>
              {options?.map(res => (
                <Comp label={res.label} value={res.value} {...formItem.props}></Comp>
              ))}
            </>
          );
        }
      }

      return () => {
        const { formItem } = props;
        const { prop, render, rules, label } = formItem;
        const values = { formModel, formItem };
        const solfn = getSlot<FormItemRenderProps<T>>(slots, prop as string, values);
        const getContent = () => {
          return solfn || (render ? render(values) : renderComponent());
        };
        return (
          <>
            <el-form-item label={label} prop={prop} rules={rules}>
              {getContent()}
            </el-form-item>
          </>
        );
      };
    },
    {
      props: ['formItem', 'formModel'],
    },
  );
</script>
