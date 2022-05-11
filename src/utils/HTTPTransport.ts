enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
    method: string,
    headers?: [string, string],
    data?: any
}

class HTTPTransport {
  private basePath: string;

  constructor(url: string) {
    this.basePath = url;
  }

  public get = <Response>(url = '', options:Omit<Options, 'method'> = {}): Promise<Response> => {
    const stringifyUrl: string = this.basePath + url + this.queryStringify(options.data);

    return this.request(stringifyUrl, { ...options, method: METHODS.GET });
  };

  public post = <Response>(url = '', options:Omit<Options, 'method'> = {}): Promise<Response> =>
    this.request(this.basePath + url, { ...options, method: METHODS.POST });

  public put = <Response>(url = '', options:Omit<Options, 'method'> = {}): Promise<Response> =>
    this.request(this.basePath + url, { ...options, method: METHODS.PUT });

  public delete = <Response>(url = '', options:Omit<Options, 'method'> = {}): Promise<Response> =>
    this.request(this.basePath + url, { ...options, method: METHODS.DELETE });

  private queryStringify = (data: Record<string, number | string> | undefined): string => {
    if (!data) return '';
    return `?${Object.entries(data)
      .map((arr) => `${arr[0]}=${arr[1]}`)
      .join('&')}`;
  };

  private request<Response>(url: string, options: Options): Promise<Response> {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = 'json';

      if (!headers) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.withCredentials = true;

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (headers?.[1] === 'multipart/form-data') {
        xhr.send((data));
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
