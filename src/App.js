import {
    matchPath,
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
    useOutletContext,
} from "react-router-dom";
import "./assets/css/style.scss";
import { BackWrap } from "./components/Layout/BackWrap";
import Container from "./components/Layout/Container";
import ContentWrap from "./components/Layout/ContentWrap";
import Footer from "./components/Layout/Footer";
import {
    HeaderType2,
    HeaderTypeNone,
    HeaderType4,
} from "./components/Layout/Header";
import headerConfig from "./components/Layout/HeaderConfig";
import Menu from "./components/Layout/Menu";
import CampList from "./page/Camp/CampList";
import CampListMap from "./page/Camp/CampListMap";
import CampReservation from "./page/Camp/CampReservation";
import CampReservationComplete from "./page/Camp/CampReservationComplete";
import CampReservationPay from "./page/Camp/CampReservationPay";
import CampView from "./page/Camp/CampView";
import CampViewMap from "./page/Camp/CampViewMap";
import DiaryList from "./page/Diary/DiaryList";
import DiaryView from "./page/Diary/DiaryView";
import DiaryWrite from "./page/Diary/DiaryWrite";
import Home from "./page/Home";
import Complete from "./page/Member/Complete";
import Login from "./page/Member/Login";
import PwFind from "./page/Member/PwFind";
import Register from "./page/Member/Register";
import Terms from "./page/Member/Terms";
import StoreList from "./page/Store/StoreList";
import StorePay from "./page/Store/StorePay";
import StorePayComplete from "./page/Store/StorePayComplete";
import StoreView from "./page/Store/StoreView";
import CampLikeList from "./page/User/CampLikeList";
import CampReservationList from "./page/User/CampReservationList";
import CampReservationView from "./page/User/CampReservationView";
import MyDiaryList from "./page/User/MyDiaryList";
import Notice from "./page/User/Notice";
import Qna from "./page/User/Qna";
import StoreCartList from "./page/User/StoreCartList";
import StoreOrderList from "./page/User/StoreOrderList";
import StoreOrderView from "./page/User/StoreOrderView";
import StoreReviewList from "./page/User/StoreReviewList";
import UserMypage from "./page/User/UserMypage";
import UserMypageMent from "./page/User/UserMypageMent";
import Style from "./Style";
import CampPayFail from "./page/Camp/CampPayFail";
import CampPayCancel from "./page/Camp/CampPayCancel";

import PwFindAuth from "./page/Member/PwFindAuth";
import PwFindChange from "./page/Member/PwFindChange";
import PwChangeComplete from "./page/Member/PwChangeComplete";
import React, { useContext, useEffect, useState } from "react";
import ModalResions from "./components/Modal/ModalResions";
import ModalReview from "./components/Modal/ModalReview";
import ModalStore from "./components/Modal/ModalStore";
import ModalContext from "./components/Modal/ModalContext";
import { useSelector } from "react-redux";
import { ReviewProvider } from "./components/User/ReviewContext";
import Loding from "./page/Loding";
import StoreReviewWrite from "./page/User/StoreReviewWrite";

const showMenuPath = ["/", "/diary/list", "/store/list", "/user/mypage"];
const showFooterPath = [
    "/",
    "/store/view",
    "/user/mypage",
    "/camp/list",
    "/camp/reservation",
    "/camp/pay",
    "/store/pay",
    "/diary/list",
    "/diary/write",
    "/diary/view",
    "/user/store/order/view",
    "/user/notice",
    "/user/qna",
    "/user/mypage/management",
    "/user/camp/reservation/list",
    "/user/camp/reservation/view/:reservationid",
    "/user/store/review/list",
    "/user/camp/like/list",
    "/user/diary/list",
];
function LayoutType() {
    function getHeaderConfig(pathname) {
        for (const [path, config] of Object.entries(headerConfig)) {
            if (matchPath(path, pathname)) {
                return config;
            }
        }
    }
    const location = useLocation();
    const {
        title = "홈",
        component: HeaderComponent = HeaderType2,
        titleStore = false,
    } = getHeaderConfig(location.pathname) ?? {};

    // 메뉴
    const showMenu = showMenuPath.includes(location.pathname);
    const showFooter = showFooterPath.includes(location.pathname);
    const isHeaderType2 = HeaderComponent === HeaderType2;
    const isHeaderTypeNone = HeaderComponent === HeaderTypeNone;
    const isHeaderType4 = HeaderComponent === HeaderType4;

    const [modalNum, setModalNum] = useState(0);
    const [modalView, setModalView] = useState(false);
    const modalData = [
        <ModalReview key="review" />,
        <ModalStore key="store" />,
        <ModalResions key="resions" />,
    ];
    const [modalDetail, setModalDetail] = useState(null);

    function modalOpen(idx, data = null) {
        setModalView(true);
        setModalNum(idx);
        setModalDetail(data);
    }

    function modalClose() {
        setModalView(false);
        setModalDetail(null);
    }

    function modalSubmit() {
        setModalView(false);
    }

    useEffect(() => {
        const containerWrapElement = document.querySelector(".containerWrap");

        if (modalView) {
            containerWrapElement.style.overflow = "hidden";
        } else {
            containerWrapElement.style.overflow = "auto";
        }
        return () => {
            containerWrapElement.style.overflow = "auto";
        };
    }, [modalView]);
    return (
        <ModalContext.Provider
            value={{
                modalOpen,
                modalClose,
                modalDetail,
                setModalDetail,
            }}
        >
            <BackWrap>
                <Container>
                    {/* {modalView && modalData[modalNum] && (
                        <div>
                            {React.cloneElement(modalData[modalNum], {
                                onClick: modalClose,
                            })}
                        </div>
                    )} */}
                    {modalView && modalData[modalNum] && (
                        <div>
                            {React.cloneElement(modalData[modalNum], {
                                onClick: modalClose,
                                data: modalDetail,
                                onSubmit: modalDetail?.onSubmit,
                            })}
                        </div>
                    )}
                    <HeaderComponent
                        titleStore={titleStore}
                        modalOpen={modalOpen}
                    >
                        {title}
                    </HeaderComponent>
                    <ContentWrap
                        modalOpen={modalOpen}
                        className={` ${
                            isHeaderTypeNone || isHeaderType4
                                ? "cntSearchView"
                                : ""
                        } ${isHeaderType2 && showFooter ? "cntView" : ""}`}
                    >
                        <Outlet />
                    </ContentWrap>
                    {showFooter && (
                        <Footer
                            className={`${showMenu ? "footerBottom" : ""}`}
                        />
                    )}
                    {showMenu && <Menu />}
                </Container>
            </BackWrap>
        </ModalContext.Provider>
    );
}
function App() {
    const loginState = useSelector((state) => state.loginSlice);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const locationPath = useLocation();

    useEffect(() => {
        // 로그인 상태가 변할 때만 실행되도록 의존성 배열에 loginState.email 추가
        if (loginState.email) {
            setIsLoading(false); // 로그인이 확인되면 로딩 해제
        } else {
            if (locationPath.pathname.startsWith("/member")) {
                console.log("멤버는제외");
                setIsLoading(false);
            } else {
                setTimeout(() => {
                    // 일정 시간 후 로그인 페이지로 이동
                    console.log("여기서강제로이동");
                    if (!loginState.email) {
                        navigate("/member/login");
                    }
                    setIsLoading(false); // 타임아웃 후에도 로딩 상태 해제
                }, 4000);
            }
        }
    }, [loginState, navigate]);

  if (isLoading) {
    return <Loding />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutType />}>
          <Route path="/" index element={<Home />}></Route>
          {/* camping  */}
          <Route path="/camp/list" element={<CampList />}></Route>
          <Route path="/camp/list/map" element={<CampListMap />}></Route>
          <Route path="/camp/view/:id" element={<CampView />}></Route>
          <Route
            path="/camp/view/map/:id"
            index
            element={<CampViewMap />}
          ></Route>
          <Route
            path="/camp/reservation/:id"
            index
            element={<CampReservation />}
          ></Route>
          <Route
            path="/camp/pay/:id/:reservId"
            index
            element={<CampReservationPay />}
          ></Route>
          <Route
            path="/camp/pay/complete/:reservNum/:reservId/:name/:carNum/:request/:tel"
            index
            element={<CampReservationComplete />}
          ></Route>
          {/* diary  */}
          <Route path="/diary/list" index element={<DiaryList />}></Route>
          <Route path="/diary/write" index element={<DiaryWrite />}></Route>
            <Route path="/diary/view/:id" index element={<DiaryView />}></Route>
          {/* store  */}
          <Route path="/store/list" index element={<StoreList />}></Route>
          <Route
            path="/store/view/:productId"
            index
            element={<StoreView />}
          ></Route>
          <Route
            path="/store/pay/:productId"
            index
            element={<StorePay />}
          ></Route>
          <Route
            path="/store/pay/complete/:productId/:orderId/:totalPrice/:tel/:name/:add/:addDetail"
            index
            element={<StorePayComplete />}
          ></Route>
          {/* user  */}
          <Route path="/user/mypage" index element={<UserMypage />}></Route>
          <Route
            path="/user/mypage/management"
            index
            element={<UserMypageMent />}
          ></Route>
          <Route
            path="/user/camp/reservation/list"
            index
            element={<CampReservationList />}
          ></Route>
          <Route
            path="/user/camp/reservation/view/:reservationid"
            index
            element={<CampReservationView />}
          ></Route>
          <Route
            path="/user/camp/like/list"
            index
            element={<CampLikeList />}
          ></Route>
          <Route
            path="/user/diary/list"
            index
            element={<MyDiaryList />}
          ></Route>
          <Route
            path="/user/store/order/list"
            index
            element={<StoreOrderList />}
          ></Route>
          <Route
            path="/user/store/order/review/:productId"
            index
            element={<StoreReviewWrite />}
          ></Route>
          <Route
            path="/user/store/cart/list"
            index
            element={<StoreCartList />}
          ></Route>
          <Route
            path="/user/store/review/list"
            index
            element={<StoreReviewList />}
          ></Route>
          <Route path="/user/qna" index element={<Qna />}></Route>
          <Route path="/user/notice" index element={<Notice />}></Route>
          {/* member */}
          <Route path="/member/login" index element={<Login />}></Route>
          <Route path="/member/pwfind" index element={<PwFind />}></Route>
          <Route
            path="/member/pwfind/auth"
            index
            element={<PwFindAuth />}
          ></Route>
          <Route
            path="/member/pwfind/change"
            index
            element={<PwFindChange />}
          ></Route>
          <Route
            path="/member/pwfind/complete"
            index
            element={<PwChangeComplete />}
          ></Route>
          <Route path="/member/terms" index element={<Terms />}></Route>
          <Route path="/member/register" index element={<Register />}></Route>
          <Route
            path="/member/register/complete"
            index
            element={<Complete />}
          ></Route>
          <Route path="/style" element={<Style />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
