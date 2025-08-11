import sql from "@/app/api/utils/sql";

// Get all generations (with pagination)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const offset = (page - 1) * limit;

    const generations = await sql`
      SELECT 
        id, 
        prompt, 
        model_name, 
        image_size, 
        steps, 
        guidance, 
        image_url, 
        created_at
      FROM generations 
      ORDER BY created_at DESC 
      LIMIT ${limit} 
      OFFSET ${offset}
    `;

    return Response.json({ 
      generations, 
      page, 
      limit 
    });

  } catch (error) {
    console.error('Error fetching generations:', error);
    return Response.json(
      { error: 'Failed to fetch generations' }, 
      { status: 500 }
    );
  }
}

// Create a new generation
export async function POST(request) {
  try {
    const { prompt, model, size, steps, guidance, imageUrl } = await request.json();

    if (!prompt || !model || !size || !imageUrl) {
      return Response.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    const [generation] = await sql`
      INSERT INTO generations (prompt, model_name, image_size, steps, guidance, image_url)
      VALUES (${prompt}, ${model}, ${size}, ${steps || 50}, ${guidance || 7.5}, ${imageUrl})
      RETURNING id, prompt, model_name, image_size, steps, guidance, image_url, created_at
    `;

    return Response.json({ generation }, { status: 201 });

  } catch (error) {
    console.error('Error creating generation:', error);
    return Response.json(
      { error: 'Failed to create generation' }, 
      { status: 500 }
    );
  }
}