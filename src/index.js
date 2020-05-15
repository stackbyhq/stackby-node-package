const fetch = require("isomorphic-fetch");

const BASE_ENDPOINT = "https://stackby.com/api/betav1/";

const createFetch = ({ url, ...params }) =>
  fetch(url, params)
    .then(resp => resp.json())
    .catch(e => e);

class Stackby {
  constructor(config) {
    this.config = config;
  }

  stack(ref) {
    this.config.stack = ref;
    return this;
  }

  table(ref) {
    this.config.table = ref;
    return this;
  }

  view(ref) {
    this.config.view = ref;
    return this;
  }

  stringify(params = {}) {
    const { stack, table, view } = this.config;
    const merged = {
      maxRecords: 20,
      ...params
    };

    if (view) {
      merged.view = view;
    }

    let url = `${BASE_ENDPOINT}rowlist/${stack}/${table}`;

    if (Object.keys(merged).length) {
      url += `?${this.serialize(merged)}`;
    }
    return url;
  }

  list(params = {}) {
    const { apiKey } = this.config;

    const req = async (accumulator = null, offset = "") => {
      console.log(offset);
      const url = this.stringify({ ...params, offset });

      console.log(url, apiKey);

      let data = await createFetch({
        url,
        method: "GET",
        headers: {
          "api-key": `${apiKey}`
        }
      });

      console.log(data);

      if (!data || !data.records) {
        return data;
      }

      let { records } = data;

      if (accumulator) {
        if (records.length) {
          accumulator.records = accumulator.records.concat(records);
        }
      } else {
        accumulator = data;
      }

      if (!data.offset) {
        return accumulator;
      }

      offset = data.offset;
      delete accumulator.offset;
      return req(accumulator, offset);
    };

    return req(null, params.offset || "");
  }

  update(params) {
    const { stack, table, apiKey } = this.config;
    const url = `${BASE_ENDPOINT}rowupdate/${stack}/${encodeURI(table)}`;
    console.log(url);
    return createFetch({
      url,
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "api-key": `${apiKey}`
      },
      body: JSON.stringify(params)
    });
  }

  create(params) {
    const { stack, table, apiKey } = this.config;
    const url = `${BASE_ENDPOINT}rowcreate/${stack}/${encodeURI(table)}`;
    // console.log(url,);
    return createFetch({
      url,
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "api-key": `${apiKey}`
      },
      body: JSON.stringify(params)
    });
  }

  retrieve(id) {
    let params = { "rowIds[]": id };
    return this.list(params);
  }

  delete(ids) {
    let params = "";
    ids.map(v => {
      params += `rowIds[]=${v}&`;
    });

    const { stack, table, apiKey } = this.config;
    const url = `${BASE_ENDPOINT}rowdelete/${stack}/${encodeURI(
      table
    )}?${params}`;
    console.log(url);
    return createFetch({
      url,
      method: "DELETE",
      headers: {
        "api-key": `${apiKey}`
      }
    });
  }

  serialize(params) {
    let converted = [];
    Object.keys(params).forEach(key => {
      converted.push(`${key}=${params[key]}`);
    });
    return converted.join("&");
  }
}

module.exports = Stackby;
