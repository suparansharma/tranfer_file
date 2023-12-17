export default async function handler(req, res) {

    console.log(`get:req:token= ${req.body.access_token}`);
    console.log(`get:req:endpoint= ${process.env.NEXT_API_URL}${req.body.endpoint}`);

    const response = await fetch(
        `${process.env.NEXT_API_URL}${req.body.endpoint}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: `Bearer ${JSON.parse(req.body.access_token)}`,
            },
            withCredentials: true,
        },
    )
    const resData = await response.json()
    res.status(200).json(resData)
}
