export class Api {
  baseURL;
  options;

  constructor(baseURL, options) {
    this.baseURL = baseURL;
    this.options = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };
  }

  async getData(uri) {
    try {
      const result = await fetch(`${this.baseURL}/${uri}`);
      if (result.ok) return result.json();
    } catch (err) {
      console.log("Не удалось получить данные: ", err);
    }
  }
}
