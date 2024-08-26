"use client";
import { React, useEffect, useState } from "react";
import Patient from "./index";
import "./styles.scss";
// import WithAuthRedirect from "../../../../internals/sign-in/withAuthRedirect";
function Page() {
  // const [hasReloaded, setReloaded] = useState(false);
  // useEffect(() => {
  //   if (!hasReloaded) {
  //     setReloaded(true);
  //     window.location.reload();
  //   }
  // }, [hasReloaded]);
  return (
    <div>
      {/* <WithAuthRedirect> */}
      <Patient />
      {/* </WithAuthRedirect> */}
    </div>
  );
}

export default Page;
