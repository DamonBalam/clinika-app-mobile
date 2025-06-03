import api from "../axios";
import { IResponse } from "../Response";

class EqNuDataService {
  async getByCita(id: number): Promise<IResponse<any[]>> {
    const response = await api.get(`show/equivalencias-nutricionales/${id}`);
    return response!.data;
  }
}

export const eqNuDataService = new EqNuDataService();
