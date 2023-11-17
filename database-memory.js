import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map()

    list(search){
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray [0]
            const data = videoArray [1]

            return {
                id,
                ...data,
            }
        })
        // verifica se possui filtro, se possuir retorna os titulos 
        //que possuem o filtro, se não retorna tudo.
        .filter(video => {
            if (search){
                return video.title.includes(search)
            }
            return true
        })
        

    }
    create(video){
        const videoId = randomUUID()

        this.#videos.set(videoId, video)
    }
    update(id, video){
        this.#videos.set(id, video)
    }
    delete(id){
        this.#videos.delete(id)
    }
}