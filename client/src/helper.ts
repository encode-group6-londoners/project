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
    CLOUD,
    ROCKET_SLANT,
    RAIN,
    MOUNTAIN,
    TRACTOR,
    WALK,
    CROWN
} from "@blueprintjs/icons/lib/esm/generated/iconNames";
import {ethers} from "ethers";

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
    CAMERA,
    ROCKET_SLANT,
    RAIN,
    MOUNTAIN,
    TRACTOR,
    WALK,
    CROWN
];

export function getRandomIcon(text: string): string {
    const index = ethers.utils.id(text).substr(-1).charCodeAt(0) % 16;
    return list[index];
}