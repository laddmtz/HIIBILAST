import sql from "@/app/api/utils/sql";

// Download generated image by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: "Generation ID is required" },
        { status: 400 },
      );
    }

    // Get generation data from database
    const [generation] = await sql`
      SELECT 
        id, 
        prompt, 
        model_name, 
        image_size, 
        image_url, 
        created_at
      FROM generations 
      WHERE id = ${id}
    `;

    if (!generation) {
      return Response.json({ error: "Generation not found" }, { status: 404 });
    }

    try {
      // Fetch the image from the URL
      const imageResponse = await fetch(generation.image_url);

      if (!imageResponse.ok) {
        throw new Error("Failed to fetch image");
      }

      // Get image data
      const imageBuffer = await imageResponse.arrayBuffer();

      // Always use PNG format for downloads
      const extension = "png";
      const contentType = "image/png";

      // Create filename based on generation data - always PNG
      const sanitizedPrompt = generation.prompt
        .substring(0, 50)
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_");

      const filename = `${generation.model_name}_${sanitizedPrompt}_${generation.id}.png`;

      // Return the image with download headers - force PNG format
      return new Response(imageBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Length": imageBuffer.byteLength.toString(),
        },
      });
    } catch (fetchError) {
      console.error("Error fetching image for download:", fetchError);
      return Response.json(
        { error: "Failed to download image" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Download error:", error);
    return Response.json({ error: "Download failed" }, { status: 500 });
  }
}
