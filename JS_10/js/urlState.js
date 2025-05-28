// js/urlState.js

const parseQueryString = (query) => {
  const params = new URLSearchParams(query);
  return Object.fromEntries(params.entries());
};

const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== null && params[key] !== '' && params[key] !== undefined) {
      searchParams.set(key, params[key]);
    }
  }
  return searchParams.toString();
};

const updateUrl = (params) => {
  const queryString = buildQueryString(params);
  const newUrl = `${window.location.pathname}?${queryString}`;
  window.history.replaceState({}, '', newUrl);
};

const getUrlParams = () => {
  return parseQueryString(window.location.search);
};

export { getUrlParams, updateUrl };
