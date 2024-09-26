import { API } from "src/common/api";
import { ICitaControl } from "./CitaControl";
import { IResponse } from "../Response";

class CitaControlDataService {
  async getAll(id: string): Promise<IResponse<ICitaControl[]>> {
    const response = await API.get(`show/history-cita-control/${id}`, {});
    return response!.data;
  }
}

export const citaControlDataServices = new CitaControlDataService();
