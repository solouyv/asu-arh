import { ReactElement, useContext, useState } from "react";

import { ThemeContext } from "@context/ThemeContext";
import useMatchMedia from "@hooks/useMatchMedia";
import classNames from "classnames";
import { MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

import { laboratories, tests } from "../../router/Links";
import styles from "./navpanel.module.scss";

function NavPanel(): ReactElement {
  const { theme } = useContext(ThemeContext);
  const { isMobile, isSmallMobile, isUnder324px } = useMatchMedia();
  const [showNavMenu, setShowNavMenu] = useState<boolean>(false);

  function handleShowMenu() {
    setShowNavMenu((prev) => !prev);
  }

  return (
    <>
      {isMobile || isSmallMobile || isUnder324px ? (
        <div className={classNames(styles.mobile_container, styles[theme])}>
          {showNavMenu ? (
            <MdClose
              size={32}
              className={styles.button}
              onClick={handleShowMenu}
            />
          ) : (
            <MdMenu
              size={32}
              className={styles.button}
              onClick={handleShowMenu}
            />
          )}
          {showNavMenu && (
            <div
              className={classNames(styles.mobile_nav_container, styles[theme])}
            >
              <Link to={laboratories.path} className={styles.link}>
                {laboratories.title}
              </Link>
              <Link to={tests.path} className={styles.link}>
                {tests.title}
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className={classNames(styles.container, styles[theme])}>
          <Link to={laboratories.path} className={styles.link}>
            {laboratories.title}
          </Link>
          <Link to={tests.path} className={styles.link}>
            {tests.title}
          </Link>
        </div>
      )}
    </>
  );
}

export default NavPanel;
