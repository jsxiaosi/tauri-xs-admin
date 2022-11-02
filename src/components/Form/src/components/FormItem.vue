<script lang="tsx">
  import type { DefineComponent, PropType } from 'vue';
  import { defineComponent, resolveComponent } from 'vue';
  import { elComponentItem } from '../../componentMap';
  import type { FormItemListProps } from '../../types/from';
  import { getSlot } from '@/utils/slotsHelper';
  export default defineComponent({
    props: {
      formItem: {
        type: Object as PropType<FormItemListProps>,
        default: () => {},
      },
      formModel: {
        type: Object as PropType<Recordable>,
        default: () => {},
      },
    },
    setup(props, { slots }) {
      const { formItem, formModel } = props as {
        formItem: FormItemListProps;
        formModel: {
          [key: string]: string;
        };
      };

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
              {options?.map((res) => (
                <Comp label={res.label} value={res.value} {...formItem.props}></Comp>
              ))}
            </>
          );
        } else {
          return;
        }
      }

      return () => {
        const { formItem } = props;
        const { prop, render, rules, label } = formItem;
        const values = { formModel: formModel, formItem: formItem };
        const solfn = getSlot(slots, prop, values);
        const getContent = () => {
          return solfn ? solfn : render ? render(values) : renderComponent();
        };
        return (
          <el-form-item label={label} prop={prop} rules={rules}>
            {getContent()}
          </el-form-item>
        );
      };
    },
  });
</script>
