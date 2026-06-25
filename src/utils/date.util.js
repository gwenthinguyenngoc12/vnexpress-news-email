export function getTodayDate() {
  return new Date().toLocaleDateString("vi-VN", {
    timeZone: "America/Toronto",
  });
}

export function formatVietnameseDateTime(dateString = "") {
  if (!dateString) {
    return "Không rõ thời gian";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Không rõ thời gian";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}