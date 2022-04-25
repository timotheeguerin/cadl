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

export interface ObjectMember {
  name: string;
  type: "method" | "property";
}

export interface ObjectMetaType {
  type: "object";
  id: number;
  members: ObjectMember[];
}

export interface ValueMetaType {
  type: "value";
  value: any;
}

export type MetaType = ObjectMetaType | ValueMetaType;
