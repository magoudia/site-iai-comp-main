export async function sendEmail(formData) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  }