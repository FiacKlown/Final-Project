export async function getGenres(){
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}genres?key=${import.meta.env.VITE_API_KEY}`
    );
    const json = await response.json();
    return json.results;
}


export async function preLoadedFilters(){
    const genres = await getGenres()
    return {
        genres,
    };
}

export async function getGame({params}) {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}games/${params.id}?key=${
            import.meta.env.VITE_API_KEY
        }`
    );
    const json = await response.json();
    return json;
}
