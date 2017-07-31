/* globals $ */

class UserService {
    request(url, type, data) {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                type,
                data,
                success: resolve,
                error: reject,
            });
        });

        return promise;
    }

    get(url) {
        return this.request(url, 'GET');
    }

    delete(url) {
        return this.request(url, 'DELETE');
    }

    put(url, data) {
        return this.request(url, 'PUT', data);
    }
}

export default new UserService();
