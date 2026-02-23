export interface IStorage {
  createContactInquiry(inquiry: any): Promise<any>;
}

export class MemoryStorage implements IStorage {
  async createContactInquiry(inquiry: any): Promise<any> {
    // Just return the inquiry without saving to DB
    return {
      ...inquiry,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
  }
}

export const storage = new MemoryStorage();