import { getInviteCode } from '@/apis/couple';
import { showErrorToast } from '@/utils/toastUtil';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const useGenerateInviteCodeMutation = () => {
  const inviteCodeMutation = useMutation({
    mutationFn: getInviteCode,
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error?.response?.status === 409) {
          showErrorToast(
            '❌ 초대코드를 발급할 수 없습니다.',
            '이미 배우자가 등록되어 있습니다.',
          );
        }
      }
    },
  });

  return {
    mutateGenerateInviteCode: inviteCodeMutation.mutate,
    isPending: inviteCodeMutation.isPending,
  };
};
