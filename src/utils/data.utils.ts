export const getData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    return await response.json();
}

/*e.g.
type Monster = {
    id: string;
    name: string;
    email: string;
}
const fetchUser = async() =>{
    const users = await getData()
}
*/