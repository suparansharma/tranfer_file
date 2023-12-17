export default async function handler(req, res) {

    console.log(`post:req:token= ${req.body.access_token}`);
    console.log(`post:req:endpoint= ${process.env.NEXT_API_URL}${req.body.endpoint}`);

    const response = await fetch(
        `${process.env.NEXT_API_URL}${req.body.endpoint}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: `Bearer ${JSON.parse(req.body.access_token)}`,
            },
            withCredentials: true,
            body: JSON.stringify(req.body.data),
        },
    )
    const resData = await response.json()
    res.status(200).json(resData)
}
