const { useState, useEffect } = require("react")

const useFetchData = endpoint => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchingData = async () => {
            try {
                const res = await fetch(endpoint);
                
                if(!res.ok) throw new Error('failed fetching data.');

                const result = await res.json();

                setData(result);
                setLoading(false);

            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchingData();
    },[endpoint]);

    return {data, error, loading};
}

export default useFetchData;