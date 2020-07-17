/** @jsx jsx */
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { css, jsx } from "@emotion/core";

const Button = ({ buttonText, path }) => {
  return (
    <Link href={path}>
      <button css={navButtonStyle}>{buttonText}</button>
    </Link>
  );
};

Button.propTypes = {
  classProp: PropTypes.string,
  buttonText: PropTypes.string,
  path: PropTypes.string,
};
const navButtonStyle = css({
  backgroundColor: "hotpink",
  fontSize: "24px",
  "&:hover": {
    color: "cornflowerblue",
  },
});
const navContainerStyle = css({
  display: "flex",
  flexDirection: "row",
});
export const NavBarLinks = ({ containerClass = "" }) => {
  return (
    <div className={`nav-bar-links-container ${containerClass}`}>
      <Button path="/" buttonText="Home" />
      <Button path="/plants" buttonText="Plants" />
      <Button path="/create-plant" buttonText="Add new plant" />
    </div>
  );
};

const NavBar = () => {
  return (
    <div css={navContainerStyle}>
      <NavBarLinks />
    </div>
  );
};

export default NavBar;

NavBarLinks.propTypes = {
  containerClass: PropTypes.string,
};
