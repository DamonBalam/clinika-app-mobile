import { API } from "src/common/api";
import { IResponse } from "../Response";

class EqNuDataService {
  async getByCita(id: number): Promise<IResponse<any[]>> {
    const response = await API.get(
      `show/equivalencias-nutricionales/${id}`,
      {}
    );
    return response!.data;
  }
}

export const eqNuDataService = new EqNuDataService();
