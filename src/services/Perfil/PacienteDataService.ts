import api from "../axios";
import { IPacienteRES } from "./Paciente";
import { IResponse } from "../Response";
import { useAuthStore } from "src/stores/auth";
const store = useAuthStore();

const { deleteLocalStorage } = store;
class PacienteDataService {
  async getById(id: string): Promise<IResponse<{ user: IPacienteRES }>> {
    let response;
    try {
      response = await api.get(`show/user/${id}`, {});
    } catch (error) {
      deleteLocalStorage();
    }
    return response!.data;
  }
}

export const pacienteDataServices = new PacienteDataService();
