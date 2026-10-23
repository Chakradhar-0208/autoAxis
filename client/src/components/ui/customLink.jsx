import { Link as RouterLink } from "react-router-dom";
 const scroll = () =>{
        window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
 };
const CustomLink = ({ onClick, ...props }) => {
  const handleClick = (event) => {
    // Preserve any existing onClick handler
    onClick?.(event);

    // Don't scroll if the click was prevented
    if (!event.defaultPrevented) {
      scroll();
    }
  };

  return <RouterLink {...props} onClick={handleClick} />;
};

export {CustomLink, scroll};
