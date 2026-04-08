export const externalApiClient = {
    fetchNews: async (topic: string) => {
        // Mock external API call
        return `Results for ${topic}: AI is evolving...`;
    },
    sendNotification: async (email: string, message: string) => {
        console.log(`Sending email to ${email}: ${message}`);
        return true;
    }
};