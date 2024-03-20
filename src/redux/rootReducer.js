import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postCustomer from "./postReducer/postCustomer";
import postServiceLocation from "./postReducer/postServiceLocation";
import getGetTechnician from "./Slices/GetTechnician";
import postWaterbody from "./postReducer/postWaterbody";
import getCustomer from "./Slices/getCustomer";
import getSingleCustomer from "./Slices/getSingleCustomer";
import getSingleWorkOrder from "./Slices/getSingleWorkOrder";
import getCustomerService from "./Slices/getCustomerService";
import getCustomerType from "./Slices/getCustomerType";
import getCustomerCity from "./Slices/getCustomerCity";
import getCustomerState from "./Slices/getCustomerState";
import getCustomerCountry from "./Slices/getCustomerCountry";
import getRateType from "./Slices/getRateType";
import getLaborCost from "./Slices/getLaborCost";
import getWaterbodyType from "./Slices/getWaterbodyType";
import getfrequency from "./Slices/getfrequency";
import getTags from "./Slices/getTags";
import userReducer from "./Slices/userSlice";
import getWaterBody from "./Slices/getWaterBody";
import getSingleWaterBody from "./Slices/getSingleWaterBody";
import postServiceCheckList from "./postReducer/postServiceCheckList";
import getserviceCheckList from "./Slices/getserviceCheckList";
import getpoolImages from "./Slices/getpoolImages";
import getEquipment from "./Slices/getEquipment";
import postwaterbodyType from "./postReducer/postwaterbodyType";
import  postwaterbodyequipmwntData  from "./postReducer/postEquipment";
import getWorkOrderType from "./Slices/getWorkOrderType";
import getReccurence from "./Slices/getReccurence";
import { postworkordertypeData } from "./postReducer/postWorkOrderType";
import { postItemNeedePostData } from "./postReducer/postItemNeeded";
import getItemNeeded from "./Slices/getItemNeeded";
import getProductType from "./Slices/getProductType";
import postProductType from "./postReducer/postProductType";
import getAllEquipment from "./Slices/getAllEquipment";

import getAllDosages from "./Slices/getAllDosages";
import postReadingData from "./postReducer/postReadingData";
import getAllReading from "./Slices/getAllReading";
import postworkorderData from "./postReducer/postWorkorder";
import getWorkorder from "./Slices/getWorkorder";
import  postTechnicianData  from "./postReducer/postTechnician";
import postProducts from "./postReducer/postProducts";
import getProduct from "./Slices/getProduct";
import postShopingList from "./postReducer/postShopingList";
import getActiveServiceRoute from "./Slices/getActiveServiceRoute";
import postRouteAssignment from "./postReducer/postRouteAssignment";
import getRouteAssignment from "./Slices/getRouteAssignment";
import getSingleActiveService, {
  fetchgetSingleActiveService,
} from "./Slices/getSingleActiveService";
import postWorkorderSetting from "./postReducer/postWorkorderSetting";
import getServiceImages from "./Slices/getServiceImages";
import getSingleProduct from "./Slices/getSingleProduct";
import getAllEquipmentListing from "./Slices/getAllEquipmentListing";
import getSaleGroup from "./Slices/getSaleGroup";
import getSaleTax from "./Slices/getSaleTax";
import postRateTaxPost from "./postReducer/postRateTax";
import getSaleGroupName from "./Slices/getSaleGroupName";
import postSalesTaxGroup from "./postReducer/postSalesTaxGroup";
import getZoomToMap from "./Slices/getZoomToMap";
import getDashboardData from "./Slices/getDashboardData";
import ProfileDetail from "./Slices/ProfileDetail";
import getInvoiceData from "./Slices/getInvoiceData";
import getInvoiceDetail from "./Slices/getInvoiceDetail";
import getProfileData from "./Slices/getProfileData";
import getProfiitDetails from "./Slices/getProfiitDetails";
import getPackages from "./Slices/getPackages";
import PostRegistration from "./postReducer/PostRegistration";
import PostPaymentData from "./postReducer/PostPaymentData";
import getbroadCastEmail from "./Slices/getbroadCastEmail";
import getlabourReportSlice from "./Slices/getlabourReportSlice";
import getinstalledItemsReport from "./Slices/getinstalledItemsReport";
import getchemicalReportSlice from "./Slices/getchemicalReportSlice";
import getworkOrderReport from "./Slices/getworkOrderReport";
import getskippedStopReport from "./Slices/getskippedStopReport";
import postDosages from "./postReducer/postDosages";
import postwaterbodyImages from "./postReducer/postPoolImages";
import getWorkOrderRoute from "./Slices/getWorkOrderRoute";
import getAccoutDetails from "./Slices/getAccoutDetails";
import getCSVData from "./Slices/getCSVData";
import postResetPassword from "./postReducer/postResetPassword";
import postEmailBoardCast from "./postReducer/postEmailBoardCast";
import  postBoardEmail from "./postReducer/postBoardCastEmail";
import getItemNeededWaterBody from "./Slices/getItemNeededWaterBody";
import getPaymentInfoData from "./Slices/getPaymentInfoData";
import PostChangePayment from "./postReducer/PostChangePayment";
import  postCancelPayment from "./postReducer/postPaymentCancelation";
import getPaymentHistory from "./Slices/getPaymentHistory";

const rootReducer = combineReducers({
  user: userReducer,
  getCustomer: getCustomer,
  postsCustomer: postCustomer,
  postServiceLocation: postServiceLocation,
  Technician: getGetTechnician,
  postwaterbody: postWaterbody,
  getSingleCustomer: getSingleCustomer,
  getSingleWorkOrder: getSingleWorkOrder,
  getSingleProduct: getSingleProduct,
  getCustomerService: getCustomerService,
  getCustomerType: getCustomerType,
  getCustomerCity: getCustomerCity,
  getCustomerState: getCustomerState,
  getCustomerCountry: getCustomerCountry,
  getRateType: getRateType,
  getLaborCost: getLaborCost,
  getwaterbodyType: getWaterbodyType,
  getfrequency: getfrequency,
  tag: getTags,
  waterbody: getWaterBody,
  singlewaterbody: getSingleWaterBody,
  postserviceCheckList: postServiceCheckList,
  getserviceCheckList: getserviceCheckList,
  postwaterbodyImages: postwaterbodyImages,
  waterbodyImage: getpoolImages,
  getEquipmemnt: getEquipment,
  postwaterbodyType: postwaterbodyType,
  postwaterbodyequipmwnt: postwaterbodyequipmwntData,
  getWorkOrderType: getWorkOrderType,
  workOrderTyperecurrence: getReccurence,
  postworkordertype: postworkordertypeData,
  postItemNeedePost: postItemNeedePostData,
  getitemNeededData: getItemNeeded,
  getProductType: getProductType,
  postsProductType: postProductType,
  getAllEquipmemnt: getAllEquipment,
  postdosages: postDosages,
  getAlldosage: getAllDosages,
  postReading: postReadingData,
  getAllreading: getAllReading,
  postworkorder: postworkorderData,
  getWorkOrder: getWorkorder,
  postTechnician: postTechnicianData,
  postProducts: postProducts,
  getProductData: getProduct,
  postShopinglist: postShopingList,
  activeServicedashboard: getActiveServiceRoute,
  postrouteAssignment: postRouteAssignment,
  getRouteAssingnment: getRouteAssignment,
  getSingleActiveService: getSingleActiveService,
  postsworkOrderTypeSetting: postWorkorderSetting,
  getAllServiceImages: getServiceImages,
  getEquipmentListing: getAllEquipmentListing,
  SalesTaxGroup: getSaleGroup,
  SalesTax: getSaleTax,
  postRateTaxPost: postRateTaxPost,
  SalesTaxGroupName: getSaleGroupName,
  postSalesTaxGroupPost: postSalesTaxGroup,
  ZoomToMap: getZoomToMap,
  getDashboardApi: getDashboardData,
  profileDetail: ProfileDetail,
  getInvoiceData: getInvoiceData,
  getInvoiceDetail: getInvoiceDetail,
  getProfitData: getProfileData,
  getProfitDetail: getProfiitDetails,
  packagesData: getPackages,
  postRegistration: PostRegistration,
  postPaymentData: PostPaymentData,
  broadCastEmail: getbroadCastEmail,
  labourReport: getlabourReportSlice,
  installedItemsReport: getinstalledItemsReport,
  chemicalReport: getchemicalReportSlice,
  workorderReport: getworkOrderReport,
  skippedStopReport: getskippedStopReport,
  WorkOrderRouteApi:getWorkOrderRoute,
  accountDetail:getAccoutDetails,
  getCSVData:getCSVData,
  postResetpassword:postResetPassword,
  postEmailboardcast:postEmailBoardCast,
  postBoardEmail:postBoardEmail,
  getWaterBodyItemNeeded:getItemNeededWaterBody,
  getPaymentData:getPaymentInfoData,
  postChangePayment:PostChangePayment,
  postCancelPayment:postCancelPayment,
  getPaymentHistory:getPaymentHistory
});
export default rootReducer;
