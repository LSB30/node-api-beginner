import { randomUUID } from "crypto";

export class DataBaseMemory {
  // # - chave privada, visivel apenas na classe
  #videos = new Map();

  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoArrays) => {
        const id = videoArrays[0];
        const data = videoArrays[1];

        return {
          id,
          ...data,
        };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        }

        return true;
      });
  }

  create(video) {
    // UUID - Universal unique ID
    const videoId = randomUUID();
    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
