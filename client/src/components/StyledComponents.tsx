//@ts-nocheck
import styled from "styled-components"

export const GradientBox = styled.div`
  // background: linear-gradient(45deg, #7c3aed, #ff1b6b);
  background: linear-gradient(
    45deg,
    rgba(137, 112, 239, 0.2),
    rgba(249, 174, 105, 0.2)
  ); /* Adjust the alpha (0.8) as needed */
  //   width: 30;
  //   height: 75px;
  //   padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  ::before {
    background: #fff;
  }

  :hover::before {
    background: #fcfaff;
  }
`

export const NavbarGradientDark = styled.div`
  // background: linear-gradient(45deg, #7c3aed, #ff1b6b);
  background: linear-gradient(
    45deg,
    rgba(137, 112, 239, 0.4),
    rgba(249, 174, 105, 0.4)
  ); /* Adjust the alpha (0.8) as needed */
  //   width: 30;
  //   height: 75px;
  //   padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  ::before {
    background: #fff;
  }

  :hover::before {
    background: #fcfaff;
  }
`

export const NavbarGradientLight = styled.div`
  // background: linear-gradient(45deg, #7c3aed, #ff1b6b);
  background: linear-gradient(
    45deg,
    rgba(137, 112, 239, 0.85),
    rgba(249, 174, 105, 0.85)
  ); /* Adjust the alpha (0.8) as needed */
  //   width: 30;
  //   height: 75px;
  //   padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  ::before {
    background: #fff;
  }

  :hover::before {
    background: #fcfaff;
  }
`

export const CardGradient = styled.div`
  // background: linear-gradient(45deg, #7c3aed, #ff1b6b);
  background: linear-gradient(
    45deg,
    rgba(137, 112, 239, 0.15),
    rgba(249, 174, 105, 0)
  );
  //   width: 30;
  //   height: 75px;
  //   padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  ::before {
    background: #fff;
  }

  :hover::before {
    background: #fcfaff;
  }
`

export const StyledSquircleDark = styled.div`
  position: relative;
  padding: 1.25rem 1.5rem;
  display: inline-block;
  z-index: 999;
  text-align: left;

  /* Border color */
  background: #374151;

  &::before {
    /* Background color  */
    background: #1f2937;
    z-index: 999;
    position: relative;
  }
`

export const StyledSquircleLight = styled.div`
  position: relative;
  padding: 1.25rem 1.5rem;
  display: inline-block;
  z-index: 999;
  text-align: left;

  /* Border color */
  background: #e4e4e7;

  &::before {
    /* Background color  */
    background: #ffffff;
    z-index: 999;
    position: relative;
  }
`

export const IconSquircleDark = styled.div`
  padding: 10px;
  display: inline-block;

  /* Border color */
  background: linear-gradient(45deg, #7c3aed, #ff1b6b);

  &::before {
    /* Background color  */
    background: rgba(0, 0, 0, 1);
  }
`

export const IconSquircleLight = styled.div`
  padding: 10px;
  display: inline-block;

  /* Border color */
  background: linear-gradient(45deg, #7c3aed, #ff1b6b);

  &::before {
    /* Background color  */
    background: rgba(255, 255, 255, 1);
  }
`