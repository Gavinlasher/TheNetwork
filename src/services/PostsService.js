import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {

  async getAllPost(query = {}) {
    const res = await api.get('api/posts/', { params: query })
    logger.log(res.data)
    AppState.posts = res.data

  }



}

export const postsService = new PostsService()