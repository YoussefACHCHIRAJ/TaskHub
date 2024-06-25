import axios from "axios";
import useAuthContext from "./useAuthContext";
import useDeleteMember from "./useDeleteMember";
import useDeleteTask from "./useDeleteTask";
import useGetDefaultInfo from "./useGetDefaultInfo";
import useGetMembers from "./useGetMembers";
import useGetTasks from "./useGetTasks";
import useLogin from "./useLogin";
import useLogout from "./useLogout";
import useRegister from "./useRegister";
import useResponsive from "./useResponsive";
import useStoreMember from "./useStoreMember";
import useStoreTask from "./useStoreTask";
import useStoreTeam from "./useStoreTeam";
import useUpdateTask from "./useUpdateTask";
import useGetNotifications from "./useGetNotifications";
import useUpdateNotification from "./useUpdateNotification";

const axiosBase = axios.create({ baseURL: process.env.REACT_APP_SERVER_URI });

export {
    axiosBase,
    useAuthContext,
    useDeleteMember,
    useDeleteTask,
    useGetDefaultInfo,
    useGetMembers,
    useGetTasks,
    useLogin,
    useLogout,
    useRegister,
    useResponsive,
    useStoreMember,
    useStoreTask,
    useStoreTeam,
    useUpdateTask,
    useGetNotifications,
    useUpdateNotification
}