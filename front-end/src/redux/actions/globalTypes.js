export const GLOBALTYPES = {
    AUTH: "AUTH",
    NOTIFY: "NOTIFY",
    STATUS: "STATUS",
}

export const EditData = (data, id, post) => {
    const newData = data.map(item => 
        (item._id === id ? post : item)
    )
    return newData;
}