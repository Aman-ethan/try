import { useLayoutEffect, useState } from "react";
import { DrawerProps } from "antd";

export default function useWindowSize() {
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile screen
        setPlacement("bottom");
      } else {
        // Larger screens
        setPlacement("right");
      }
    };

    // Set the initial placement on component mount
    handleResize();

    // Update the placement when the screen size changes
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return { placement };
}
