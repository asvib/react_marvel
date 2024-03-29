import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process,setProcess] = useState('waiting');//new

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setProcess('loading');//new

        try {
            const response = await fetch(url, {method, body, headers});

            if(!response.ok) {
                throw new Error (`Could not fetch ${url}, status: ${response.status}`)
            }
            const data = await response.json();
            return data;
        } catch(e) {
            setProcess('error');//new
            throw e;
        }

    }, []);

    //old--const clearError = useCallback (() => {}setError(null), []);
    const clearError = useCallback (() => {
        setProcess('loading')
    }, []);
    return { request, clearError, process, setProcess}
}