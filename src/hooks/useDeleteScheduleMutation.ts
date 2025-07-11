import { deleteSchedule } from '@/apis/schedule';
import { showErrorToast } from '@/utils/toastUtil';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteScheduleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (_, { yearMonth }) => {
      queryClient.invalidateQueries(['schedules', yearMonth]);
    },
    onError: () => {
      showErrorToast('일정 삭제에 실패했어요. 잠시 후에 다시 시도해주세요.');
    },
  });
};
