export type FeedbackFormData = {
    name: string;
    email: string;
    rating: number;
    feedback: string;
    allowDisplay: boolean;
  };
  
  export async function sendFeedbackEmail(data: {
    name: string;
    email: string;
    rating: number;
    feedback: string;
    allowDisplay: boolean;
  }) {
    const response = await fetch('/api/send-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send feedback email');
    }
  
    return response.json();
  } 