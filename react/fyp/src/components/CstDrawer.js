import React from "react";
import { Drawer } from "@material-ui/core";

const CstDrawer = (props) => {
  return (
    <div>
      <Drawer anchor="left" variant="temporary" onClose={console.log("close")}>
        HIIIIII
      </Drawer>
    </div>
  );
};

// CstDrawer.defaultProps = {
//   open: false,
// };

export default CstDrawer;
