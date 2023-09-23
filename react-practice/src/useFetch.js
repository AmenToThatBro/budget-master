import { useState, useEffect} from 'react';

// Custom Hooks
// name must start with 'use'

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();
        // not asynchronis
        fetch(url, { signal: abortCont.signal })
            // returns a response object
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch the data for that resoure');
                }
                // convert response object into json and return
                return res.json()
            })
                // take the json converted response object
            .then((data) => {
                //update states
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((e) => {
                if(e.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(e.message);
                }
                
            })

        return () => abortCont.abort();
    }, [url]);
    // return the data needed for the hook
    return { data, isPending, error };
}
// export to use
export default useFetch;