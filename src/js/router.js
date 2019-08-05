class Router {
    routes = new Map();

    constructor(routes = []) {
        for (const route of routes.values()) {
            this.routes.set(route.path, route.handler);
        }

        return this;
    }

    listen() {
        const self = this;

        // 自定義一個當 pushState 或 popState 之後，處理事件的函數
        const onpushstate = (e) => {
            self.execute(getUrlFragment(e.state));
        };

        // 使用立即函示來取代原本 history.pushState 的行為
        (function init(history) {
            // 由於下方會取代原先的 pushState，所以這邊先 fork 一份原本的 pushState，以免會無窮迴圈
            const { pushState } = history;

            history.pushState = (...argv) => {
                onpushstate({
                    state: argv[0]
                });

                // 使用先前 fork 出來的 pushState 來執行原本 pushState 該做的事情
                return pushState.apply(history, argv);
            };
        }(window.history));

        // 更改 onpopstate 的原始行為，使其與 pushState 時一致
        window.onpopstate = onpushstate;

        // 執行第一次
        self.execute(getUrlFragment);

        return self;
    }

    execute(path) {
        if (this.routes.has(path)) {
            this.routes.get(path)(path);
        }
    }
}

/**
 * 獲取當下或指定 url 片段
 * 去掉問號後字串的去除以及結尾的 slashes
 *
 * @param path
 * @returns {string}
 */
function getUrlFragment(path = window.location.pathname) {
    const newUrl = decodeURI(path).replace(/\?(.*)$/, '').replace(/\/$/, '');

    return newUrl === '' ? '/' : newUrl;
}

/**
 * 重導向 url
 *
 * @param path
 */
function navigate(path) {
    const realPath = getUrlFragment(path);
    window.history.pushState(realPath, null, realPath);
}

export {
    getUrlFragment,
    navigate
};

export default Router;
