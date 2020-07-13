import authMgr from "./authMgr";

export const request = async (fetchUrlObj, method = 'GET', body) => {
    return new Promise((resolve, reject) => {
        const authToken = authMgr.getAuthToken();
        const userName = authMgr.getUsername();
        if (!authToken) {
            console.error('No auth token');
            reject({});
        }

        if (!fetchUrlObj) {
            console.error('No or invalid url');
            reject({});
        }
        try {
            fetchUrlObj.searchParams.append('username', userName);
            let params = {
                'Content-Type': 'application/json',
                headers: new Headers({
                    'Authorization': authToken
                })
            };
            if (method !== 'GET') {
                params.method = 'POST';
                params.body = JSON.stringify(body)
            }
            resolve(fetch(fetchUrlObj, params).then(response => response.json()));
        }
        catch (e) {
            console.error('error fetching response', e);
            reject({});
        }
    });
}

export const setCouldData = ({
    pre,
    name,
    query,
    validator,
    victory,
    defeat,
    body
}) => {
    pre();
    const setDataUrl = new URL("https://indmrclke8.execute-api.us-west-2.amazonaws.com/dev/add");
    setDataUrl.searchParams.append('objectName', name);
    if (query) {
        Object.keys(query).forEach(queryKey => {
            setDataUrl.searchParams.append(queryKey, query[queryKey]);
        })
    }
    request(setDataUrl, 'POST', body).then((response) => {
        if (validator(response)) {
            victory(response?.data)
        } else {
            defeat()
        }
    }, (reason) => {
        defeat(reason)
    });
}

export const getCloudData = ({
    pre,
    name,
    query,
    validator,
    victory,
    defeat
}) => {
    pre();
    const getDataUrl = new URL("https://indmrclke8.execute-api.us-west-2.amazonaws.com/dev/getdata");
    getDataUrl.searchParams.append('objectName', name);
    if (query) {
        Object.keys(query).forEach(queryKey => {
            getDataUrl.searchParams.append(queryKey, query[queryKey]);
        })
    }
    request(getDataUrl).then((response) => {
        if (validator(response)) {
            victory(response?.data)
        } else {
            defeat()
        }
    }, (reason) => {
        defeat(reason)
    });
}
