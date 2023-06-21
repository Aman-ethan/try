"use client";

import { Button, Drawer } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { use, useState } from "react";

export default function StatementDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const layoutSegment = useSelectedLayoutSegment();
  return (
    <>
      <Button type="primary" size="large" onClick={() => setIsDrawerOpen(true)}>
        Add a Statement
      </Button>
      <Drawer
        width={720}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        footer={
          <Button type="primary" size="large">
            Upload
          </Button>
        }
        title={
          layoutSegment
            ? `Upload ${
                layoutSegment[0].toUpperCase() + layoutSegment.slice(1)
              } Statement`
            : "Upload Statement"
        }
      />
    </>
  );
}
