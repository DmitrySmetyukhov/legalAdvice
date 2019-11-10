export abstract class BasePaginationComponent{
  public abstract sortingFields: string[];
  public abstract total: number;
  public abstract items: any[];
}
