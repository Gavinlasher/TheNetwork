import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PaidService {

  async getAllPaid() {
    const res = await api.get('api/ads')
  
    AppState.paid = res.data

  }
}



export const paidService = new PaidService()