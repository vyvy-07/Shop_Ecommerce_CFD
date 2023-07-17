import HeaderMiddle from "./HeaderMiddle";
import HeaderTop from "./HeaderTop";
import { useHeader } from "./useHeader";

const Header = () => {
  const { headerMiddle } = useHeader();
  return (
    <header className="header">
      <HeaderTop />
      <HeaderMiddle {...headerMiddle} />
    </header>
  );
};

export default Header;
