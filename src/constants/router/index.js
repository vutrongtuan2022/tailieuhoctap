import Loai from "../loai/Loai";
import Login from "../components/login";
import AddSpaecies from "../loai/NewSpecies/AddSpaecies";
import EditSpecies from "../loai/EditSpecies/Edit";
const publicRouter = [
  { path: "/Loai", component: Loai },
  { path: "/them-moi", component: AddSpaecies },
  { path: "/cap-nhat", component: EditSpecies },
];
const privateRoutes = [{ path: "/auth/login", component: Login },];
export { publicRouter, privateRoutes };