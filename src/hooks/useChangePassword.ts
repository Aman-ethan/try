import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { Form, message } from "antd";
import { useAuthServerPutMutation } from "./useMutation";

interface IChangePasswordArgs {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

interface IChangePasswordResponse {}

interface IChangePasswordParams {
  onSuccess: (_data: IChangePasswordResponse) => void;
}

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);
const strengthStrokeColor = [
  "#f5222d",
  "#fa8c16",
  "#fadb14",
  "#a0d911",
  "#52c41a",
];

export default function useChangePassword({
  onSuccess,
}: IChangePasswordParams) {
  const [form] = Form.useForm<IChangePasswordArgs>();
  const password = Form.useWatch("new_password", form);

  const passwordInfo = zxcvbn(password || "");
  const passwordScore = passwordInfo.score;
  const helpText = password
    ? passwordInfo.feedback.warning ||
      passwordInfo.feedback.suggestions.join(" ")
    : undefined;
  const { trigger, isMutating } = useAuthServerPutMutation<
    IChangePasswordArgs,
    IChangePasswordResponse
  >("/change-password", {
    onSuccess,
    onError() {
      message.error("Password change failed. Please try again.");
    },
  });

  return {
    progressProps: {
      percent: (passwordScore / 4) * 100,
      strokeColor: strengthStrokeColor[passwordScore],
    },
    helpText,
    trigger,
    isMutating,
    form,
  };
}
