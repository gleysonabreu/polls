export type HttpResponse = {
  statusCode: number;
  body: any;
  headers?: {
    [key: string]: string | number;
  }
}
