const useFetchData = async endpoint => {
    try {
        const fetchTasks = await fetch(endpoint, {
            "method": "GET",
        });
        const tasks = await fetchTasks.json();
        console.log(tasks);

    } catch (error) {
        return { error: error.message };
    }
}

export default useFetchData;