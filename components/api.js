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

  async getData(urn) {
    try {
      const uri = new URL(urn, this.baseURL);
      const result = await fetch(uri);
      if (result.ok) return result.json();
    } catch (err) {
      console.log("Не удалось получить данные: ", err);
    }
  }
}
