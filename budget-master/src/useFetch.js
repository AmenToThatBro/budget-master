import { useState} from 'react';

export default function useFetch(baseUrl) {

    // const [loading, setLoading] = useState(true);
    const [loading, setLoading] = useState('true');

    function get(url) {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url)
                .then(response => response.json())
                .then(data => {
                    if (!data) {
                        setLoading(false);
                        return reject(data);
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch(err => {
                    setLoading(false);
                    reject(err)
                });
        })
    }

    function post(url, body) {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: 'post',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false);
                resolve(data);
            })
            .catch(err => {
                setLoading(false);
                reject(err);
            })
        })
    }

    return { get, post, loading};
}