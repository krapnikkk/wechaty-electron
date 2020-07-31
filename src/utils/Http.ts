export const http = {
    get: (url: string):Promise<Response> => {
      const promise:Promise<Response> = new Promise((resolve, reject) => {
        fetch(url).then((res) => {
          resolve(res.json());
        }).catch((err) => {
          reject(err);
        })
      });
      return promise;
    },
    post: (url: string, params: any):Promise<Response> => {
      const promise:Promise<Response> = new Promise((resolve, reject) => {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(params)
        }).then((res) => {
          resolve(res.json());
        }).catch((err) => {
          reject(err);
        })
      });
      return promise;
    }
  }