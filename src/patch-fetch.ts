export function patchFetch(global: Window) {
  const _fetch = global.fetch;
  function defaultJsonBodyFetch(
    input: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> {
    // 개발 모드가 아닐 때는 /api prefix 추가
    // if (process.env.NODE_ENV !== 'development') {
    //   const prefix = input.toString().startsWith('/') ? '/api' : '/api/';
    //   input = prefix + input.toString();
    // }
    // 옵션이 존재하지 않으면 JSON으로 간주
    if (!init) {
      init = { headers: { "Content-Type": "application/json" } };
    } else {
      // 옵션과 옵션 하위 헤더가 존재하고
      if (init.headers) {
        // let headers = init.headers as Record<string, string>;
        // 헤더에 Content-Type이 지정되어 있지 않으면 JSON으로 간주
        // if (!headers['Content-Type']) {
        //   headers['Content-Type'] = 'application/json';
        // }
      } else {
        // 헤더가 존재하지 않으면 JSON으로 간주
        init.headers = { "Content-Type": "application/json" };
      }
    }

    return _fetch.apply(global, [input, init]);
  }
  global.fetch = defaultJsonBodyFetch;
}
