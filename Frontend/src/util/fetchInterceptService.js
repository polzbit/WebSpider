import fetchIntercept from 'fetch-intercept'

export const initIntercept = () => {
  fetchIntercept.register({
    request(url, config = {}) {
      // Modify the url or config here

      const configEnriched = {
        ...config,
        headers: {
          ...config.headers,
        },
      }

      return [url, configEnriched]
    },

    requestError(error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error)
    },

    response(response) {
      // Modify the reponse object
      return response
    },

    responseError(error) {
      // Handle an fetch error
      return Promise.reject(error)
    },
  })
}
