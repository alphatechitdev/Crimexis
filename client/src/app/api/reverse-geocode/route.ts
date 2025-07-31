
export async function GET(req : Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
        return new Response(JSON.stringify({error:"Missing Coordinates"}))
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`, {
            headers:{
                'User-Agent' : 'CrimexisApp/1.0 (admin@crimex.com)'
            }
        });

        if (!response.ok) {
            return new Response(JSON.stringify({error:'Nominatim API error'}))
        }

        const data = await response.json();
        const location = data.display_name;
        return new Response(JSON.stringify({location}), {
            status:200,
            headers:{
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.error("Error While Rev Geocoding, ", error);
        return new Response(JSON.stringify({error:"Error While Fetching Location"}), 
        {status:500}
    )
    }
    
}