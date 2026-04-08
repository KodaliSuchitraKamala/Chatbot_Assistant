export const knowledgeBase = {
    getServiceInfo(service: string): string {
        const info: Record<string, string> = {
            "Branding": "Our **Branding Packages** start at **$500**. They include:\n- Logo Design\n- Color Palette\n- Typography\n- Brand Guidelines",
            "Full Management": "**Full Management** packages are tailored to your needs. Contact us for a **custom quote**!",
            "Team Management": "Effective **Team Management** involves:\n- **Clear Communication**: Regular 1-on-1s and transparent goals.\n- **Tool Integration**: Using platforms like Slack or Trello for workflows.\n- **Empowerment**: Delegating tasks to foster growth and accountability.\nWould you like a specific guide on any of these?",
        };
        return info[service] || `I have information on **${service}**. Would you like the details?`;
    },
    getFAQ(topic:string): string {
        const faqs: Record<string, string> = {
            "pricing": "Our services start at **$500** for branding. Management varies by project scope.",
            "availability": "We typically have openings for new projects within **2-3 weeks**. Use the 'Check Availability' tool for real-time slots!",
        };
        return faqs[topic.toLowerCase()] || "I can help with that! We offer various services including branding and team management.";
    }
};