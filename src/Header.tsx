import { useCallback } from "react";
import { useBardContext } from "./BardViewContext";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

export const Header = () => {
  const { bardContextValue, setBardContextValue } = useBardContext();

  const onMenuClick = useCallback(() => {
    setBardContextValue({
      ...bardContextValue,
      isMenuOpen: !bardContextValue.isMenuOpen,
    });
  }, [setBardContextValue, bardContextValue]);

  return (
    <div className="header a-center">
      <div className="headerLeft">
        <div className="headerMenu cursor-pointer" onClick={onMenuClick}>
          <svg focusable="false" viewBox="0 0 24 24" width={24} height={24}>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
        </div>

        <div className="a-center bardLabel">
          <a
            aria-label="Google Bard"
            href="/"
            title="Google Bard"
            className="a-center"
          >
            <img
              src="https://www.gstatic.com/lamda/images/OGB_badge_en_v1_light_d9fefe2c502b5bf2d6b1.svg"
              alt=""
              aria-hidden="true"
              role="presentation"
            />
          </a>
        </div>
      </div>

      <div className="headerRight j-btw">
        <div className="cursor-pointer rightIcon">
          <SettingsOutlinedIcon />
        </div>

        <div className="cursor-pointer rightIcon">
          <PermIdentityOutlinedIcon />
        </div>
      </div>
    </div>
  );
};
