import { ElMessage, ElMessageBox } from 'element-plus';
import type { ElMessageBoxOptions } from 'element-plus';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

function createElMessageBox(message: string, title: string, options: ElMessageBoxOptions) {
  ElMessageBox.confirm(message, title, options)
    .then(() => {})
    .catch(() => {});
}

function createErrorModal(message: string) {
  createElMessageBox(message, t('sys.errorTip'), {
    confirmButtonText: t('sys.okText'),
    cancelButtonText: t('sys.closeText'),
    type: 'error',
  });
}

function createErrorMsg(message: string) {
  ElMessage.error(message);
}

export function useMessage() {
  return {
    createErrorModal,
    createErrorMsg,
  };
}
