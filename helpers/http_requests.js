export const http_post_request = async params => {

    params['access_token'] = localStorage.getItem("access_token") ?? null;
    console.log('access token', params)

    const response = await fetch(`${process.env.NEXT_APP_API_URL}/api_post_request`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' },
    })
    return await response.json()
}



export const http_put_request = async params => {

    params['access_token'] = localStorage.getItem("access_token") ?? null;
    console.log('access token', params)

    const response = await fetch(`${process.env.NEXT_APP_API_URL}/api_put_request`, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' },
    })
    return await response.json()
}


// export const http_put_request = async  params => {

//     params['access_token'] = localStorage.getItem("access_token") ?? null;

//     const response = await fetch(`${process.env.NEXT_APP_API_URL}/api_put_request`, {
//         method: 'PUT',
//         body: JSON.stringify(params),
//         headers: { 'Content-Type': 'application/json' },
//     });

//     return await response.json();
// };





export const http_get_request = async params => {

    params['access_token'] = localStorage.getItem("access_token") ?? null;

    const response = await fetch(`${process.env.NEXT_APP_API_URL}/api_get_request`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' },
    })
    return await response.json()
}
