// import 'src/css/logo.scss';
import IcLogo from 'assets/svg/logo.svg';
import IcCart from 'assets/svg/cart.svg';
import IcPlaceholder from 'assets/svg/placeholder.svg';
import IcServiceDoc from 'assets/svg/service-doc.svg';
import IcSearch from 'assets/svg/search.svg';
import IcSkype from 'assets/svg/skype.svg';
import IcLinkedin from 'assets/svg/linkedin.svg';

const iconPool = {
  IcLogo,
  IcCart,
  IcServiceDoc,
  IcSearch,
  IcSkype,
  IcLinkedin
};

const Icon = ({ name }) => {
  const Icon = iconPool[name] || IcPlaceholder;
  return <Icon />;
};

export default Icon;
