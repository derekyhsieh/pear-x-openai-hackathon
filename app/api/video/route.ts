
const GATEKEEP_API_KEY = process.env.GATEKEEP_API_KEY!;

export async function POST(req: Request) {
    const data = await req.json();
    const options = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + GATEKEEP_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: data.query,
            'user_id': 'asdfa'
        }),
    };

    try {
        let response = await fetch('https://vapi.gatekeep.ai/api/v1/gen_video_opus', options);
        let json = await response.json();
        return Response.json(json);
    } catch (e: any) {
        console.log(e);
        return Response.json({ error: e });
    }
}
