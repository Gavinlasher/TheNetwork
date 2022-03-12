import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {

  async getAllPost(query = {}) {
    const res = await api.get('api/posts/', { params: query })
    logger.log(res.data)
    AppState.posts = res.data.posts
    AppState.nextPage = res.data.newer
    AppState.previousPage = res.data.older
  }
  async createPost(postData){
    const res =  await api.post('api/posts', postData)
    logger.log(res.data)
     AppState.posts.unshift(res.data)

  }

async remove(id){
  const res = await api.delete('api/posts/' + id)
  logger.log(res.data)
  AppState.posts = AppState.posts.filter(p => p.id != id)
}
async like(id){
const res = await api.post('api/posts/' + id + '/like')
logger.log(res.data)

}

async changePage(page){
const res = await api.get(page)
AppState.posts = res.data.posts
AppState.nextPage = res.data.newer
AppState.previousPage = res.data.older
}


}

export const postsService = new PostsService()