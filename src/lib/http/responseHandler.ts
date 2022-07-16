/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function responseHandler(response) {
  const { status, data } = response;
  if (status >= 200 && status < 499) {
    return {
      status,
      data,
    };
  }

  const error = new Error(response.statusText);
  // error.response = response;

  throw error;
}
