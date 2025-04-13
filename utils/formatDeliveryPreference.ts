export const formatDeliveryPreference = (morning: boolean | undefined, evening: boolean | undefined): string => {
  if (morning && evening) {
    return "Morning, Evening"
  } else if (morning) {
    return "Morning"
  } else if (evening) {
    return "Evening"
  }
  return ""
} 