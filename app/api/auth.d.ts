declare namespace api.auth {
  export async function login(parameters: {
    login: string;
    password: string;
  }): Promise<{ status: string; token: string }>;
  export async function signout(): Promise<{ status: string }>;
  export async function refresh(parameters: {
    token: string;
  }): Promise<{ status: string }>;
}
