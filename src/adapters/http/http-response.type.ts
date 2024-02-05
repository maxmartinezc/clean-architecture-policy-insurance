export type HttpResponse = {
  httpCode: number;
  error?: {
    name: string;
    message: string;
    details: any;
  };
  payload?: any;
};
