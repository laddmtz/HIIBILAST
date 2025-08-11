import { POST as generateHIBBI1 } from "../hibbi1/generate/route.js";
import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { prompt, model, size, steps, guidance } = await request.json();

    if (!prompt || !prompt.trim()) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Validate model selection
    if (!["hibbi1", "stable-diffusion-v3"].includes(model)) {
      return Response.json(
        {
          error: "Invalid model. Supported models: hibbi1, stable-diffusion-v3",
        },
        { status: 400 },
      );
    }

    // Route HIBBI1 requests to specialized endpoint
    if (model === "hibbi1") {
      console.log("Routing to HIBBI1 generation...");

      // Create a new request object for HIBBI1
      const hibbi1Request = new Request(request.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          size,
          steps,
          guidance,
        }),
      });

      // Call HIBBI1 function directly
      const hibbi1Response = await generateHIBBI1(hibbi1Request);

      if (!hibbi1Response.ok) {
        throw new Error("HIBBI1 generation failed");
      }

      const hibbi1Result = await hibbi1Response.json();
      console.log("HIBBI1 result:", hibbi1Result);

      return Response.json({
        imageUrl: hibbi1Result.imageUrl,
        prompt,
        model: "HIBBI1",
        size,
        parameters: { steps, guidance },
        metadata: hibbi1Result.metadata,
      });
    }

    // Handle Stable Diffusion V3
    if (model === "stable-diffusion-v3") {
      console.log("Generating with Stable Diffusion V3...");

      const startTime = Date.now();

      // Parse size for Stable Diffusion API
      const [width, height] = size.split("x").map(Number);

      try {
        // Call Stable Diffusion V3 integration
        const response = await fetch(
          `/integrations/stable-diffusion-v-3/?prompt=${encodeURIComponent(prompt)}&width=${width}&height=${height}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Stable Diffusion V3 API error: ${response.status} ${response.statusText}`,
          );
        }

        const result = await response.json();

        if (!result.data || !result.data[0]) {
          throw new Error("No image data received from Stable Diffusion V3");
        }

        const imageUrl = result.data[0];
        const processingTime = Date.now() - startTime;
        const seed = Date.now();

        console.log("Stable Diffusion V3 generated image:", imageUrl);

        // Store generation data in database
        await sql`
          INSERT INTO generations (prompt, model_name, image_size, steps, guidance, image_url, processing_time, seed)
          VALUES (${prompt}, ${"Stable-Diffusion-V3"}, ${size}, ${steps || 50}, ${guidance || 7.5}, ${imageUrl}, ${processingTime}, ${seed})
        `;

        return Response.json({
          imageUrl,
          prompt,
          model: "Stable-Diffusion-V3",
          size,
          parameters: { steps: steps || 50, guidance: guidance || 7.5 },
          metadata: {
            processingTime,
            seed,
          },
        });
      } catch (error) {
        console.error("Stable Diffusion V3 generation error:", error);
        return Response.json(
          {
            error: "Stable Diffusion V3 generation failed",
            details: error.message,
          },
          { status: 500 },
        );
      }
    }
  } catch (error) {
    console.error("Image generation error:", error);
    return Response.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}
