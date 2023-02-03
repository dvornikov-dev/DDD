declare namespace config {
  const port: number;
  const db: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  const server: 'ws' | 'http' | 'fastify';
  const logger: string;
}
