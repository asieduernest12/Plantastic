import React from "react";

export function ResponsiveImageContainer({ image }) {
    return (
        <img
            src={image}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    );
}
