export interface CadlIpcConnection {
  sendNotification(name: string, value: unknown): void;
  sendRequest(name: string, value: unknown): any;
}
