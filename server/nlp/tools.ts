export interface Tool {
    name: string;
    description: string;
    execute: (args: any) => Promise<any>;
}

export const toolRegistry: Tool[] = [
    {
        name: 'checkCalendar',
        description: 'Check available slots for a given date',
        execute: async ({ date }) => {
            // Mock logic
            return ["10:00 AM", "2:00 PM", "4:30 PM"];
        }
    },
    {
        name: 'calculateQuote',
        description: 'Calculate price estimate for a service',
        execute: async ({ service, features }) => {
            // Mock logic
            const base = service === "Branding" ? 500 : 1200;
            return base + (features?.length || 0) * 100;
        }
    }
];

export const callTool = async (name: string, args: any) => {
    const tool = toolRegistry.find(t => t.name === name);
    if (tool) {
        return await tool.execute(args);
    }
    throw new Error(`Tool ${name} not found`);
};