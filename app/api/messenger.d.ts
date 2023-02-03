declare namespace api.auth {
  export async function sendMessage(parameters: {
    text: string;
    userId: number;
    areaId: number;
  }): Promise<{ status: string }>;
  export async function editMessage(parameters: {
    messageId: number;
    text: string;
  }): Promise<{ status: string }>;
  export async function addAreaUser(parameters: {
    areaId: number;
    userId: number;
  }): Promise<{ status: string }>;
  export async function getAreaUsers(parameters: {
    areaId: number;
  }): Promise<{ status: string }>;
  export async function getAreaMessages(parameters: {
    areaId: number;
  }): Promise<{ status: string }>;
}
