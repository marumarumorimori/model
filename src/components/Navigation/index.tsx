import React, { useMemo, useState, useEffect } from "react";
import styles from "./style.scss";
import { useNavigation } from "./hook";
import Logo from "@/assets/images/icon/img_logo_inversion.png";
import Account from "@/assets/images/icon/ic_account_white.png";
import Pulldown from "@/components/Pulldown";
import CloseImage from "@/assets/images/icon/btn_close.png";
import UserImage from "@/assets/images/icon/ic_account_gray.png";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router";
import cn from "classnames";

const Navigation: React.FunctionComponent = () => {
  const [accountPulldown, setAccountPulldown] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [type, setType] = useState<"pc" | "sp">();

  const { admin, onLogout } = useNavigation();

  useEffect(() => {
    const resize = () => {
      setType(window.innerWidth > 768 ? "pc" : "sp");
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const matchUrl = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return "articles";
      case "/users":
        return "users";
      case "/admins":
        return "admins";
      default:
        return null;
    }
  }, [location]);

  if (!admin) return null;

  const SlideMenu = () => {
    if (!accountPulldown) return null;
    return (
      <div className={styles.slideMenu}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.close}>
              <img
                src={CloseImage}
                alt="close"
                onClick={() => setAccountPulldown(false)}
              />
            </div>
            <Link to="/my-page" onClick={() => setAccountPulldown(false)}>
              <div className={styles.account}>
                <img src={UserImage} alt="user" />
                <div className={styles.info}>
                  <div className={styles.name}>{admin.name}</div>
                  <div className={styles.email}>{admin.email}</div>
                </div>
              </div>
            </Link>
          </div>
          <ul className={styles.menu}>
            <li>
              <Link to="/" onClick={() => setAccountPulldown(false)}>
                記事一覧
              </Link>
            </li>
            <li>
              <Link to="/users" onClick={() => setAccountPulldown(false)}>
                ユーザー一覧
              </Link>
            </li>
            <li>
              <Link to="/admins" onClick={() => setAccountPulldown(false)}>
                管理者一覧
              </Link>
            </li>
            <li>
              <div
                className={cn(styles.link, styles.logout)}
                onClick={() => onLogout()}
              >
                ログアウト
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav className={styles.component}>
        <div className={styles.container}>
          <div className={styles.left}>
            <img src={Logo} alt="logo" />
            <ul>
              <li>
                <Link to="/">記事一覧</Link>
                {matchUrl === "articles" && (
                  <div className={styles.underBar}></div>
                )}
              </li>
              <li>
                <Link to="/users">ユーザー一覧</Link>
                {matchUrl === "users" && (
                  <div className={styles.underBar}></div>
                )}
              </li>
              <li>
                <Link to="/admins">管理者一覧</Link>
                {matchUrl === "admins" && (
                  <div className={styles.underBar}></div>
                )}
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <div
              className={styles.user}
              onClick={() => setAccountPulldown(!accountPulldown)}
            >
              <div className={styles.info}>
                <div className={styles.name}>{admin.name}</div>
                <div className={styles.email}>{admin.email}</div>
              </div>
              <img src={Account} alt="account" />
              {accountPulldown && type === "pc" && (
                <Pulldown
                  items={[
                    {
                      value: "myPage",
                      text: "マイページ",
                      onClick: () => history.push("/my-page"),
                    },
                    {
                      value: "logout",
                      text: "ログアウト",
                      danger: true,
                      onClick: () => onLogout(),
                    },
                  ]}
                  className={styles.pulldown}
                  onClose={() => setAccountPulldown(false)}
                />
              )}
            </div>
            <div
              className={styles.hamburger}
              onClick={() => setAccountPulldown(!accountPulldown)}
            />
          </div>
        </div>
      </nav>
      <SlideMenu />
    </>
  );
};

export default Navigation;
