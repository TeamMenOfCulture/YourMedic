import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";

const computerVisionClient = new ComputerVisionClient("3b4cfe6c5c8449efbf2d13658bffdd91");

export async function recognizeText(imageUrl) {
  const readResult = await computerVisionClient.readImage(imageUrl);
  return readResult.text;
}
