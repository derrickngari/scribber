import { pipeline } from "@xenova/transformers";
import { MessageTypes } from "./presets";

class TranscriptionPipeline {
  static task = "automatic-speech-recognition";
  static model = "openai/whisper-tiny"; // Start small for testing
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

self.addEventListener("message", async (event) => {
  const { type, audio } = event.data;
  if (type === MessageTypes.INFERENCE_REQUEST) {
    await transcribe(audio);
  }
});

async function transcribe(audio) {
  if (!(audio instanceof Float32Array)) {
    console.error("Invalid audio format");
    self.postMessage({ type: MessageTypes.ERROR, error: "Invalid audio format" });
    return;
  }

  sendLoadingMessage("loading");
  let pipeline;

  try {
    pipeline = await TranscriptionPipeline.getInstance(load_model_callback);
    console.log("Pipeline initialized:", pipeline);
  } catch (err) {
    console.error("Pipeline error:", err);
    sendLoadingMessage("error");
    return;
  }

  sendLoadingMessage("success");

  const stride_length_s = 5;
  const generationTracker = new GenerationTracker(pipeline, stride_length_s);
  await pipeline(audio, {
    top_k: 0,
    do_sample: false,
    chunk_length: 30,
    stride_length_s,
    return_timestamps: true,
    callback_function: generationTracker.callbackFunction.bind(generationTracker),
    chunk_callback: generationTracker.chunkCallback.bind(generationTracker),
  });
  generationTracker.sendFinalResult();
}

// Rest of your code (load_model_callback, GenerationTracker, etc.) with fixes applied above