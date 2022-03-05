enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
    url: string,
    method: string,
    header?: [string, string],
    data?: object
}

class HTTPTransport {
  public get = (url: string, options: Options = {}): void => {
    const stringifyUrl: string = url + queryStringify(options.data);

    return this.request(stringifyUrl, { ...options, method: METHODS.GET });
  };

  public post = (url: string, options: Options = {}): () => Promise<TResponse> => {
    this.request(url, { ...options, method: METHODS.POST });
  };

  public put = (url: string, options: Options = {}): void => {
    this.request(url, { ...options, method: METHODS.PUT });
  };

  public delete = (url: string, options: Options = {}): void => {
    this.request(url, { ...options, method: METHODS.DELETE });
  };

  private queryStringify = (data: Record<string, number | string>): string | void => {
    if (!data) return '?';
    return `?${Object.entries(data)
      .map((arr) => `${arr[0]}=${arr[1]}`)
      .join('&')}`;
  };

  private request<TResponse>(url: string, options: Options): Promise<TResponse> {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (headers) xhr.setRequestHeader(headers);

      xhr.onload = function () {
        resolve(xhr);
      };

      const handleError = (err) => {
        console.log(err);
        reject(err);
      };

      const handleTimeout = (err) => {
        xmr.abort();
        handleError(err);
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleTimeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        console.log(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
