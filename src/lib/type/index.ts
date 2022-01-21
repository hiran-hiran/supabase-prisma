export type Item = {
  id: number;
  name: string;
  amount: number;
  status: STATUS;
};

export enum STATUS {
  READY,
  DONE,
}
