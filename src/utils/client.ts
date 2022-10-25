import axios from 'axios';
import { Config } from '@constants/config';
import { isEmpty } from './general';

type TClientOptions = {
  params: Object;
  method: string;
  data: any;
  headers: Partial<TClientHeaders>;
}

type TClientHeaders = {
  'Content-Type': string;
  'Authorization': string;
}

const defaultOptions = {
  params: {},
  method: 'GET',
  data: null,
  headers: {}
};

const client = (
  url: string,
  options: Partial<TClientOptions> = defaultOptions,
) => async () => {
  console.log(url)
  const {
    params, method, data, headers
  } = options;

  const newOptions: Partial<TClientOptions> = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  };

  let newData = null;

  if (!isEmpty(params)) {
    newOptions.params = params;
  }

  if (!isEmpty(data)) {
    newOptions.data = data;
  }

  if (!isEmpty(headers)) {
    newOptions.headers = {
      ...newOptions.headers,
      ...headers
    };
  }

  try {
    const res = await axios({
      // url: `${Config.apiBaseUrl}${url}`,
      url: `/api${url}`,
      // url: `${url}`,
      ...newOptions
    });
    newData = res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios-error', error)
    } else {
      console.error('Error', error)
    }

    throw(error)
  }

  return newData;
};

export default client;
