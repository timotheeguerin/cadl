export class ObjectRegistry {
  private nextId = 0;

  private objects = new Map<number, any>();
  private ids = new Map<any, number>();

  public get(id: number) {
    return this.objects.get(id);
  }

  public getIdFor(item: any): number {
    let id = this.ids.get(item);
    if (!id) {
      id = this.nextId++;
      this.objects.set(id, item);
      this.ids.set(item, id);
    }
    return id;
  }
}
