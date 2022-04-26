export interface CadlIpcConnection {
  sendRequest(name: string, value: unknown): Promise<unknown>;
  remote: RemoteAccessor;
}

export interface RemoteAccessor {
  valueToMeta(value: unknown): MetaType | undefined;
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

export interface MethodCallRequest {
  /**
   * Id of the object to access.
   */
  objectId: number;

  /**
   * Name of the method to access.
   */
  key: string;

  /**
   * Method args
   */
  args: MetaType[];
}

export interface ImportModuleRequest {
  name: string;
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

export interface ArrayMetaType {
  type: "array";
  items: MetaType[];
}

export interface ValueMetaType {
  type: "value";
  value: any;
}

export type MetaType = ObjectMetaType | ValueMetaType | ArrayMetaType;
