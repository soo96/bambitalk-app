import { updateSchedule } from '@/apis/schedule';
import { showErrorToast } from '@/utils/toastUtil';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSchedule,
    onSuccess: (_, { yearMonth }) => {
      queryClient.invalidateQueries(['schedules', yearMonth]);
    },
    onError: () => {
      showErrorToast('일정 수정에 실패했어요. 잠시 후에 다시 시도해주세요.');
    },
  });
};
