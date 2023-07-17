export default function getFileValueFromEvent(
  e: { fileList: File[] } | File[]
) {
  return Array.isArray(e) ? e : e?.fileList;
}
