import sql from "@/app/api/utils/sql";

// Get a single generation by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: 'Generation ID is required' }, 
        { status: 400 }
      );
    }

    const [generation] = await sql`
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
      WHERE id = ${id}
    `;

    if (!generation) {
      return Response.json(
        { error: 'Generation not found' }, 
        { status: 404 }
      );
    }

    return Response.json({ generation });

  } catch (error) {
    console.error('Error fetching generation:', error);
    return Response.json(
      { error: 'Failed to fetch generation' }, 
      { status: 500 }
    );
  }
}

// Delete a generation by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: 'Generation ID is required' }, 
        { status: 400 }
      );
    }

    const [deletedGeneration] = await sql`
      DELETE FROM generations 
      WHERE id = ${id}
      RETURNING id
    `;

    if (!deletedGeneration) {
      return Response.json(
        { error: 'Generation not found' }, 
        { status: 404 }
      );
    }

    return Response.json({ 
      message: 'Generation deleted successfully',
      id: deletedGeneration.id 
    });

  } catch (error) {
    console.error('Error deleting generation:', error);
    return Response.json(
      { error: 'Failed to delete generation' }, 
      { status: 500 }
    );
  }
}