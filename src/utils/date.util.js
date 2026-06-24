export function getTodayDate() {
  return new Date().toLocaleDateString("vi-VN", {
    timeZone: "America/Toronto",
  });
}