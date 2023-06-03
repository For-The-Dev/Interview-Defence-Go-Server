export default function setTimeKorea() {
  const currentTime = new Date();
  const utcOffset = 9 * 60 * 60 * 1000; // 한국 시간대의 UTC 오프셋 (9시간)
  const koreaTime = new Date(currentTime.getTime() + utcOffset);
  return koreaTime;
}
