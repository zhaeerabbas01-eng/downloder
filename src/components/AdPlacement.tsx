import React from "react";

interface AdPlacementProps {
  type: "banner" | "sidebar" | "in-content" | "horizontal";
  title?: string;
  id?: string;
}

export default function AdPlacement({ type, title = "Advertisement", id }: AdPlacementProps) {
  // Completely hidden per user request
  return null;
}
