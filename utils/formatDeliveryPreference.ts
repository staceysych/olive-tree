export const formatDeliveryPreference = (
  morning: boolean | undefined,
  evening: boolean | undefined,
  friday: boolean | undefined,
  sunday: boolean | undefined
): string => {
  const timeSlots = []
  if (morning) timeSlots.push("Morning")
  if (evening) timeSlots.push("Evening")
  
  const days = []
  if (friday) days.push("Friday")
  if (sunday) days.push("Sunday")
  
  const timePreference = timeSlots.length > 0 ? timeSlots.join(", ") : "Anytime"
  const dayPreference = days.length > 0 ? days.join(", ") : "Any day"
  
  return `${dayPreference} - ${timePreference}`
} 