import Svg, { Circle, Path, Rect, Text as SvgText } from 'react-native-svg';

type FeatureIconProps = {
  color: string;
  size?: number;
};

export function TrotroTripIcon({ color, size = 24 }: FeatureIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M8 5h16c2.2 0 4 1.8 4 4v14H4V9c0-2.2 1.8-4 4-4Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M7 9h18v7H7V9ZM16 9v7M4 20h24M8 24h16M10 5V3h12v2"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="9" cy="20" r="1.6" fill={color} />
      <Circle cx="23" cy="20" r="1.6" fill={color} />
      <Path
        d="M7 23v3.5M25 23v3.5M7 27h3M22 27h3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function AkwaabaPhrasebookIcon({ color, size = 24 }: FeatureIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M4 6h19a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H13l-6 5v-5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23 12h3a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-2v3l-4-3h-3"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <SvgText
        x="15"
        y="16"
        fill={color}
        fontSize="8"
        fontWeight="700"
        textAnchor="middle"
      >
        Ak
      </SvgText>
    </Svg>
  );
}
