import dayjs from "dayjs";

export default function formatInitialValues(
  initialValues?: Record<string, string>
) {
  if (!initialValues) return {};
  return Object.entries(initialValues).reduce((acc, [key, value]) => {
    if (!value) return acc;
    return {
      ...acc,
      [key]: key.includes("date") ? dayjs(value) : value,
    };
  }, {});
}
