export const getData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    return await response.json();
}

export const getEnv = (name: string): string => {

    if (typeof process.env[name] === 'string') {
        return String(process.env[name])
    }else{
        return ""
    }    
}
/*e.g.
type Monster = {
    id: string;
    name: string;
    email: string;
}
const fetchUser = async() =>{
    const users = await getData<Monster[]>(URL)
}
*/