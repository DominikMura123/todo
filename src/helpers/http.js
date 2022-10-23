export const post = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(error => {
        console.log(error.message);
    })
}

export const get = (url) =>{
    return fetch(url)
    .then(res => {
        return res.json()
    })
    .catch(error => {
        console.log(error.message);
    })
}

export const deleteAll = (url, id) => {
    return fetch(url + "/" + id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .catch(error => {
        console.log(error.message);
    });
}