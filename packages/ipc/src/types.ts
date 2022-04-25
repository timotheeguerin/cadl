export interface CadlIpcConnection {
  sendRequest(name: string, value: unknown): Promise<unknown>;
  ipcify(obj: unknown): any;
}

export interface PropertyAccessRequest {
  /**
   * Id of the object to access.
   */
  objectId: number;

  /**
   * Name of the key to access.
   */
  key: string;
}
