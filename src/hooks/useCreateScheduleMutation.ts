import { createSchedule } from '@/apis/schedule';
import { showErrorToast } from '@/utils/toastUtil';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: (_, { yearMonth }) => {
      queryClient.invalidateQueries(['schedules', yearMonth]);
    },
    onError: () => {
      showErrorToast('일정 등록에 실패했어요. 잠시 후에 다시 시도해주세요.');
    },
  });
};
