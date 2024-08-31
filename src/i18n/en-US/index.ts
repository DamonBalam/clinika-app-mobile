// This is just an example,
// so you can safely delete all default props below

import Perfil from "./Pages/Perfil";
import History from "./Pages/History";
import Plan from "./Pages/Plan";

export default {
  ...Perfil,
  ...History,
  ...Plan,
  failed: "Action failed",
  success: "Action was successful",
};
