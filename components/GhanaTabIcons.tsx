import Svg, { Circle, Defs, Mask, Path, Rect } from 'react-native-svg';

type GhanaTabIconProps = {
  color: string;
  focused?: boolean;
  size?: number;
};

const STAR_PATH =
  'M16 1l1.7 3.45 3.8.55-2.75 2.68.65 3.78L16 9.67l-3.4 1.79.65-3.78L10.5 5l3.8-.55L16 1Z';

const iconWeight = (focused?: boolean) => (focused ? 2.4 : 1.8);
const detailWeight = (focused?: boolean) => (focused ? 1.8 : 1.35);

export function IndependenceArchIcon({
  color,
  focused = false,
  size = 24,
}: GhanaTabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Defs>
        <Mask id="independenceArchStar" x="0" y="0" width="32" height="32">
          <Rect width="32" height="32" fill="white" />
          <Path d={STAR_PATH} fill="black" stroke="black" strokeWidth={1.2} />
        </Mask>
      </Defs>
      <Path
        d="M5 27h22M8 27V13h16v14M11 27V16h10v11"
        stroke={color}
        strokeWidth={iconWeight(focused)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 13h18l-2.4-6H9.4L7 13Z"
        fill={color}
        stroke={color}
        strokeLinejoin="round"
        mask="url(#independenceArchStar)"
      />
      <Path
        d={STAR_PATH}
        stroke={color}
        strokeWidth={detailWeight(focused)}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function GhanaExploreIcon({ color, focused = false, size = 24 }: GhanaTabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M9 4l5 1 3-1 4 2 1 5 3 4-2 4-1 6-4 3-4-2-3-5-3-3 2-5-1-4 2-5Z"
        stroke={color}
        strokeWidth={iconWeight(focused)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 9.5a4 4 0 0 1 4 4c0 3-4 6.5-4 6.5s-4-3.5-4-6.5a4 4 0 0 1 4-4Z"
        stroke={color}
        strokeWidth={detailWeight(focused)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="16.5" cy="13.5" r="1.35" stroke={color} strokeWidth={1.2} />
    </Svg>
  );
}

export function GhanaGuideIcon({ color, focused = false, size = 24 }: GhanaTabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle
        cx="16"
        cy="10"
        r="5"
        stroke={color}
        strokeWidth={iconWeight(focused)}
      />
      <Path
        d="M7 28c.7-7 4-11 9-11s8.3 4 9 11H7Z"
        stroke={color}
        strokeWidth={iconWeight(focused)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 18.2l1.7 2.3L16 18l1.8 2.5 1.7-2.3L21 28H11l1.5-9.8ZM16 18v10M11.8 22h8.4M12 23.5h3v2.8h-3M17 23.5h3v2.8h-3M11 7c2-3 8-3 10 0"
        stroke={color}
        strokeWidth={detailWeight(focused)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function GhanaVendorIcon({ color, focused = false, size = 24 }: GhanaTabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M5 12h22l-3-7H8l-3 7ZM7 12v15h18V12M11 27v-8h10v8"
        stroke={color}
        strokeWidth={iconWeight(focused)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 12c0 2 1.5 3 3 3s3-1 3-3c0 2 1.5 3 4 3s4-1 4-3c0 2 1.5 3 3 3s3-1 3-3M10 5l-2 7M15 5l-1 7M20 5l1 7M24 5l2 7"
        stroke={color}
        strokeWidth={detailWeight(focused)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
