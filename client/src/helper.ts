import {
    CALENDAR,
    CLEAN,
    HELICOPTER,
    HEATMAP,
    LAYOUT,
    BUGGY,
    COMPASS,
    DASHBOARD,
    CAMERA,
    CLOUD
} from "@blueprintjs/icons/lib/esm/generated/iconNames";

const list = [
    CALENDAR,
    CLEAN,
    HELICOPTER,
    HEATMAP,
    LAYOUT,
    BUGGY,
    COMPASS,
    CLOUD,
    DASHBOARD,
    CAMERA
];

export function getRandomIcon(): string {
    const index = Math.floor(Math.random() * 10);
    return list[index];
}