const getUltimos = async () => {
    const resp = await fetch('http://localhost:4000/ultimos')
    const data = await resp.json()
    return data.ultimos  
}

export default getUltimos