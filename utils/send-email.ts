export type EmailData = {
  name: string;
  email: string;
  message: string;
};

export const sendEmail = async (data: EmailData) => {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export type OrderFormData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  basket: string;
  deliveryPreference?: string;
  promotion?: string;
  notes?: string;
};

export const sendOrderEmail = async (data: OrderFormData) => {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 