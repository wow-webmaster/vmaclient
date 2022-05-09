import { lazy, Suspense } from 'react';
import {useRoutes} from 'react-router-dom';
import LoadingScreen from '../component/custom/LoadingScreen';
import MainLayout from '../page/layout/MainLayout';
import AuthGuard from "../guard/Auth";
import GuestGuard from "../guard/Guest";

const Loadable = (Component)=>(props)=>
{
    return (
        <Suspense fallback = {<LoadingScreen />}>

            <Component {...props} />
        </Suspense>
    )
}
export default function Router(){
    return useRoutes([
        {
            path:'/admin',
            element:<AuthGuard><MainLayout/></AuthGuard>,
            children:[
                {element:<GetProducts/>, path:'get-products/:vendorId'},
                {element:<GetMachines/>, path:'get-machines'}
            ]            

        },
        {
            path:'/auth',
            element:<MainLayout/>,
            children:[
                {element:<GuestGuard><Login /></GuestGuard>, index:true},
                {element:<GuestGuard><Login /></GuestGuard>, path:'login'},
                {element:<GuestGuard><VerifyOTP /></GuestGuard>, path:'verify-otp'}
            ]            

        },
        {
            path:'/',
            element:<MainLayout/>,
            children:[
                {element:<ClientHome/>, index:true},
                {element:<Products/>, path:'get-products/:vendorId'},
                {element:<Profile/>, path:'profile'},
                {element:<Billing/>, path:'billing'}
            ]            

        }
    ])
}

const Login = Loadable(lazy(() => import("../page/auth/Login")));
const VerifyOTP = Loadable(lazy(() => import("../page/auth/VerifyOTP")));
const Profile = Loadable(lazy(() => import("../page/Profile")));
const Billing = Loadable(lazy(() => import("../page/BillingInfo")));
const ClientHome = Loadable(lazy(() => import("../page/client/Home")));
const Products = Loadable(lazy(() => import("../page/client/GetProducts")));

const GetProducts = Loadable(lazy(() => import("../page/admin/ProductList")));
const GetMachines = Loadable(lazy(() => import("../page/admin/MachineList")));