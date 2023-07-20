import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { Form } from "antd";
import { useAuthServerMutation } from "./useMutation";

interface IUpdatePasswordArgs {
  new_password: string;
}

interface IUpdatePasswordResponse {}

interface IUpdatePasswordParams {
  onSuccess: (_data: IUpdatePasswordResponse) => void;
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

export default function useUpdatePassword({
  onSuccess,
}: IUpdatePasswordParams) {
  const [form] = Form.useForm<IUpdatePasswordArgs>();
  const password = Form.useWatch("new_password", form);
  const passwordInfo = zxcvbn(password || "");
  const passwordScore = passwordInfo.score;
  const helpText = password
    ? passwordInfo.feedback.warning ||
      passwordInfo.feedback.suggestions.join(" ")
    : undefined;

  const { trigger, isMutating } = useAuthServerMutation<
    IUpdatePasswordArgs,
    IUpdatePasswordResponse
  >("/reset-password", {
    onSuccess,
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
