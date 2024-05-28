import {
  StyleSheet,
  Platform,
  Dimensions,
  I18nManager,
  StatusBar,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { isTabletOrIPad, shadeColor, shadeColorForBackground } from "../utils";
import normalize from "./normalize";
import { fontFamilyMappingFunction, fontWeightMappingFunction } from "../fonts";
import { getExternalCodeSetup } from "../externalCode/externalRepo";
import { configureGlobalStyle } from "../externalCode/configurators";
import { memoize } from "../utils/memoize";
// import type { Typography } from "../services/types/branding";
import { Typographies } from "../services/enums/branding";
import FontManager from "../FontManager";
import { BOTTOM_SHEET_HEADER_HEIGHT } from "../components/BottomSheet/BottomSheetHeader";
import { generateAssetsFontCss } from "../utils/jsUtils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const LIST_PROGRESS_VIEW_OFFSET_ANDROID = 192;
export const HEADERHEIGHT = Platform.select({ ios: 44, android: 56 });
export const BARHEIGHT = Platform.OS === "android" ? 0 : getStatusBarHeight();
export const NAV_HEIGHT = HEADERHEIGHT + BARHEIGHT;
export const STATUS_BAR_HEIGHT = Platform.select({
  android: StatusBar.currentHeight,
  ios: BARHEIGHT,
});
const { width, height } = Dimensions.get("window");
export const DEVICE_WIDTH = Platform.isPad
  ? width > height
    ? height
    : width
  : width;
export const DEVICE_HEIGHT = Platform.isPad
  ? width < height
    ? height
    : width
  : height;
export const GUTTER = 17;
export const BOTTOM_SAFE_AREA = ifIphoneX(45, 20);
const minIpadSafeAreaValue = (val) => (val < 10 ? 10 : val);
export const correctBottomSafeArea = (val) =>
  isTabletOrIPad()
    ? minIpadSafeAreaValue(val) + 10
    : Platform.OS === "android"
    ? val + 20
    : val;
export const TOP_SAFE_AREA = ifIphoneX(44, 0);
export const topSafeAreaWithDynamicIsland = () => {
  const insets = useSafeAreaInsets();
  return insets.top === 59 ? insets.top : TOP_SAFE_AREA;
};
export const isHaveDynamicIsland = () => {
  const insets = useSafeAreaInsets();
  return insets.top === 59;
};
export const LIST_FILTER_HEIGHT = 61;
export const SEGMENT_FILTER_HEIGHT = 53;
export const BB_SIGNATURE_FONT_FAMILY = {
  medium: "SofiaProSoftMedium",
};
export const ACTIVITY_ITEM_IPAD_TABLET_MAX_WIDTH = DEVICE_WIDTH / 1.4;
// const colors
export const WHITE_COLOR = "#FFFFFF";
export const PALE_WHITE_COLOR = "#EDEEF2";
export const BLACK_COLOR = "#000000";
export const DARK_BLUE_COLOR = "#122b46";
export const GREY_COLOR = "rgba(0,0,0,0.33)";
export const LIGHT_WHITE_COLOR = "rgba(255,255,255,0.33)";
export const MEDIUM_WHITE_COLOR = "rgba(255,255,255,0.7)";
export const DARK_GREY_COLOR = "rgba(0,0,0,0.55)";
export const LIGHT_GREY_COLOR = "rgba(70,89,135,0.10)";
export const SUCCESS_COLOR = "#10D639";
export const WARNING_COLOR = "#FF3B30";
export const ERROR_TEXT_COLOR = "#A84B46";
export const XPROFILE_TEXT_COLOR = "#080808";
export const XPROFILE_META_TEXT_COLOR = "#787E8B";
export const FILTER_BG = "rgba(98, 100, 151, 0.11)";
export const LIST_HEADER_BG = "#F9F9F9";
export const TAG_BACKGROUND = "#F7F8F9";
export const BORDER_COLOR_ALT = "#c6c6c8";
export const INPUT_BORDER_COLOR_ALT = "#95A0AC";
export const OPTIONS_INACTIVE_COLOR = "#C3C5CA";
export const HEADER_BORDER_COLOR = "rgba(87, 87, 91,0.4)";
export const DEFAULT_BLOCK_BUTTON_BACKGROUND_COLOR = "#32383B";
export const SHADOW_TEXT = "rgba(0, 0, 0, 0.4)";
export const SHADOW = "rgba(0, 0, 0, 0.05)";
export const BB_DARK_COLOR = "#333659";
export const BB_SIGNATURE_ORANGE_COLOR = "#df613c";
// for quiz question learndash indicator colors
const indicatorColors = {
  currentLabel: "#235af3",
  reviewLabel: "#ED9615",
  answeredLabel: "#a1b6c9",
  correctLabel: "#00c349",
  incorrectLabel: "#f11414",
};
const localColors = {
  shadow: SHADOW,
  shadowText: SHADOW_TEXT,
  xProfileTextColor: XPROFILE_TEXT_COLOR,
  xProfileMetaTextColor: XPROFILE_META_TEXT_COLOR,
  filterBg: FILTER_BG,
  whiteColor: WHITE_COLOR,
  paleWhiteColor: PALE_WHITE_COLOR,
  blackColor: BLACK_COLOR,
  darkBlueColor: DARK_BLUE_COLOR,
  greyColor: GREY_COLOR,
  lightWhite: LIGHT_WHITE_COLOR,
  mediumWhite: MEDIUM_WHITE_COLOR,
  darkGreyColor: DARK_GREY_COLOR,
  lightGreyColor: LIGHT_GREY_COLOR,
  successColor: SUCCESS_COLOR,
  errorTextColor: ERROR_TEXT_COLOR,
  warningColor: WARNING_COLOR,
  tagBackground: TAG_BACKGROUND,
  borderColorAlt: BORDER_COLOR_ALT,
  inputBorderColorAlt: INPUT_BORDER_COLOR_ALT,
  optionsInactiveColor: OPTIONS_INACTIVE_COLOR,
  defaultBlockButtonBackgroundColor: DEFAULT_BLOCK_BUTTON_BACKGROUND_COLOR,
  bbDarkColor: BB_DARK_COLOR,
  bbSignatureOrangeColor: BB_SIGNATURE_ORANGE_COLOR,
};
interface LinearGradientReturnType {
  angle: number;
  colors: string[];
  locations: number[];
}
/**
 *
 * @param  {string} gradientString linear-gradient({angle}deg,{rgba color1} {loc1}%,{rgb color2} {loc2}%, ....)
 * @return {LinearGradientReturnType}                {angle: string, colors: Array, locations: Array}
 */
export const retrieveLinearGradientPropsFromString = (gradientString) => {
  const angle =
    gradientString.match(/[0-9]+deg/gi)?.[0].replace("deg", "") || "0";
  const colors =
    gradientString.match(/rgb(a)?\((([0-9]+(\.[0-9]+)?),?){4}\)\s[0-9]+\%/gi) ||
    [];
  const locations = (gradientString.match(/[0-9]+%/gi) || []).map(
    (loc) => Number(loc.replace("%", "")) / 100
  );
  return { angle: Number(angle), colors, locations };
};
/**
 *
 * @param  {string} gradientString radial-gradient({{rgb color1} {loc1}%,{rgb color2} {loc2}%, ....)
 * @return {Object}                {colors: Array, stops: Array}
 */
export const retrieveRadialGradientPropsFromString = (gradientString) => {
  const colors =
    gradientString.match(/rgb(a)?\((([0-9]+(\.[0-9]+)?),?){4}\)\s[0-9]+\%/gi) ||
    [];
  const stops = (gradientString.match(/[0-9]+%/gi) || []).map(
    (loc) => Number(loc.replace("%", "")) / 100
  );
  return { colors, stops };
};
export const textRTLStyleFix = (moreStyle = {}, defaultStyle = {}) =>
  I18nManager.isRTL ? { writingDirection: "rtl", ...moreStyle } : defaultStyle;
export const viewRTLStyleFix = (moreStyle = {}, defaultStyle = {}) =>
  I18nManager.isRTL
    ? { transform: [{ scaleX: -1 }], ...moreStyle }
    : defaultStyle;
export const gradientViewRTLFix = ({ start, end }) =>
  I18nManager.isRTL ? { start: end, end: start } : { start, end };
type Weights =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";
type FontWeightsType = {
  thin: Weights,
  ultraLight: Weights,
  light: Weights,
  regular: Weights,
  medium: Weights,
  semiBold: Weights,
  bold: Weights,
  heavy: Weights,
  black: Weights,
};
export let FontWeights: FontWeightsType = {
  thin: "100",
  ultraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  heavy: "800",
  black: "900",
};
if (Platform.OS === "android") {
  FontWeights = Object.entries(FontWeights).reduce((acc, [key, val]) => {
    if (["thin", "ultraLight", "light", "regular"].includes(key)) {
      acc[key] = "400";
    } else if (key === "medium") {
      acc[key] = "500";
    } else if (key === "semiBold") {
      acc[key] = "600";
    } else {
      acc[key] = "700";
    }
    return acc;
  }, {});
}
const buildGlobalStyles = (
  styles,
  fontFamilyMapping = fontFamilyMappingFunction,
  fontWeightMapping = fontWeightMappingFunction
) => {
  const externalCodeSetup = getExternalCodeSetup();
  const externalInputColors = externalCodeSetup.cssApi.inputColors
    ? externalCodeSetup.cssApi.inputColors
    : {};
  const inputColors = (baseColor) => {
    return {
      inputPlaceholderColor:
        externalInputColors.inputPlaceholderColor ||
        shadeColor(baseColor, 0.28),
      inputBorderColor:
        externalInputColors.inputBorderColor || shadeColor(baseColor, 0.12),
      inputFocusBorderColor:
        externalInputColors.inputFocusBorderColor || baseColor,
      inputIconColor:
        externalInputColors.inputIconColor || shadeColor(baseColor, 0.28),
    };
  };
  const {
    primaryColor,
    bodyBg,
    bodyFrontBg,
    headerBg,
    headerColor,
    headerIconColor,
    textColor,
    descTextColor,
    descLightTextColor,
    headingsColor,
    primaryButtonBg,
    primaryButtonColor,
    secondaryButtonBg,
    secondaryButtonColor,
    borderColor,
    contentLoaderColor,
    drawerBg,
    drawerColor,
    drawerActiveColor,
    bottomTabsBg,
    bottomTabsColor,
    bottomTabsActiveColor,
    authBgColor,
    regBgColor,
    authButtonBgColor,
    regButtonBgColor,
    authButtonTextColor,
    regButtonTextColor,
    notifColor,
    iapBenefitsCheckmark,
  } = styles.colors;
  const {
    filterBg,
    greyColor,
    lightGreyColor,
    whiteColor,
    blackColor,
    darkBlueColor,
    successColor,
    warningColor,
    errorTextColor,
    tagBackground,
    borderColorAlt,
    inputBorderColorAlt,
    optionsInactiveColor,
  } = localColors;
  // derived colors
  const searchColor = shadeColor("#000000", 0.9);
  const searchPlaceholderColor = shadeColorForBackground(
    "#000000",
    headerBg,
    0.6
  );
  const searchBgColor = shadeColorForBackground("#000000", headerBg, 0.1);
  const lightSearchColor = shadeColor("#FFFFFF", 0.95);
  const searchPlaceholderLightColor = shadeColorForBackground(
    "#FFFFFF",
    headerBg,
    0.8
  );
  const lightSearchBg = shadeColorForBackground("#FFFFFF", headerBg, 0.2);
  const authBg = authBgColor;
  const regBg = regBgColor;
  const linkColor = primaryColor;
  const lightTextColor = descLightTextColor;
  const iconsColor = greyColor;
  const linkArrowColor = shadeColor(linkColor, 0.45);
  const textIconColor = shadeColor(textColor, 0.5);
  const iapBenefitsCheckmarkBg = shadeColor(iapBenefitsCheckmark, 0.2);
  const coursesBg = bodyBg;
  const highlightColor = primaryColor;
  const filterBottomSheetBg = bodyBg;
  const placeholderColor = shadeColor(textColor, 0.5);
  const derivedColors = {
    searchColor,
    searchPlaceholderColor,
    searchBgColor,
    lightSearchColor,
    searchPlaceholderLightColor,
    lightSearchBg,
    authBg,
    regBg,
    linkColor,
    lightTextColor,
    linkArrowColor,
    iconsColor,
    coursesBg,
    highlightColor,
    filterBottomSheetBg,
    textIconColor,
    placeholderColor,
    iapBenefitsCheckmarkBg,
  };
  const authInputColors = inputColors(textColor);
  const customColors = externalCodeSetup.cssApi.customColors;
  const typography: Typography = styles.typography;
  /**
   *
   * @param  {[type]} pixels the custom size
   * @param  {String} key one of
   *	"bodyText" | "appHeaderTitle" | "appHeadings" | "appTabBar" | "appMenus"
   */
  const calcFontSize = (pixels, key = Typographies.bodyText) =>
    (pixels * typography[key].scale) / 100;
  const _setFont = ({
    size,
    family,
    weight = FontWeights.regular,
    color,
    typography = Typographies.bodyText,
    headingTag,
  }) => {
    let fontStyle = {
      fontFamily: fontFamilyMapping(family),
      fontWeight: weight,
    };
    if (family !== "Default") {
      fontStyle = FontManager.createFontStyles(family, {
        weight: Number(weight),
      });
      const fontWeightKey = Object.keys(FontWeights).filter((weight) =>
        fontStyle.fontFamily?.match(new RegExp(weight, "i"))
      )[0];
      if (fontWeightKey) fontStyle["fontWeight"] = FontWeights[fontWeightKey];
    }
    return Object.assign(
      {},
      fontStyle,
      {
        fontSize: headingTag
          ? calcHeadingFontSize(headingTag, size)
          : calcFontSize(size, typography),
      },
      color && { color },
      textRTLStyleFix()
    );
  };
  const setFont = memoize(_setFont, {
    normalizer: (args) => JSON.stringify(args[0]),
  });
  const BASE_HEADING_SIZE = 26;
  const calcHeadingFontSize = (headingTag, size = BASE_HEADING_SIZE) => {
    const baseFontSize = calcFontSize(size, Typographies.appHeadings);
    let scale = 1;
    switch (headingTag) {
      case "h1":
        scale = 2.0;
        break;
      case "h2":
        scale = 1.6;
        break;
      case "h3":
        scale = 1.2;
        break;
      case "h4":
        scale = 1.0;
        break;
      case "h5":
        scale = 0.8;
        break;
      case "h6":
        scale = 0.6;
        break;
      default:
        scale = 1;
    }
    return Math.floor(baseFontSize * scale);
  };
  const {
    bodyText,
    appHeaderTitle: listHeaderTitle,
    appHeadings,
    appTabBar,
    appMenus,
  } = typography;
  const setHeadingFont = (args) =>
    setFont({
      ...appHeadings,
      ...args,
      weight: args.weight || FontWeights.regular,
      typography: Typographies.appHeadings,
    });
  const setListHeaderFont = (args) =>
    setFont({
      ...listHeaderTitle,
      ...args,
      weight: args.weight || FontWeights.bold,
      typography: Typographies.appHeaderTitle,
    });
  const setAppMenusFont = (args) =>
    setFont({
      ...appMenus,
      ...args,
      weight: args.weight || FontWeights.semiBold,
      typography: Typographies.appMenus,
    });
  const globalStylesDefault = {
    // Small font style. Used On: Product Price Duration screen and Search screen
    smallText: setFont({
      size: 12,
      color: headingsColor,
      weight: FontWeights.regular,
      family: bodyText.family,
    }),
    // To show outer area of filter segment for Photos and Album. Used On: Album Screen & Photos screen
    photosSegmentFilterWrapper: {
      backgroundColor: headerBg,
      flexDirection: "row",
      justifyContent: "center",
      height: FontManager.applyFontHeightAdjustment(
        SEGMENT_FILTER_HEIGHT,
        Typographies.bodyText
      ),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: borderColor,
    },
    // To show inner area of filter segment for Photos and Album. Used On:  Album Screen & Photos screen
    photosSegmentFilterInner: {
      width: DEVICE_WIDTH - GUTTER * 2,
      marginTop: 10,
      marginBottom: 20,
    },
    // not used
    groupInviteMessageText: setFont({
      size: 14,
      color: textColor,
      weight: FontWeights.regular,
      family: bodyText.family,
    }),
    developmentSessionTitle: setHeadingFont({
      size: 16,
      weight: FontWeights.bold,
      color: headingsColor,
    }),
    // Styles to show revoking button of email invites. Used On: Email Invites screen
    emailInvitesRevokeButtonText: setHeadingFont({
      size: 14,
      weight: FontWeights.semiBold,
      color: warningColor,
    }),
    // Header font styling of email invite. Used On: Email Invites screen
    emailInvitesHeader: setHeadingFont({
      size: 20,
      weight: FontWeights.bold,
      color: headingsColor,
    }),
    // Settings screen list inactive radio button. Used On: Setting Screen
    radio: {
      height: 25,
      width: 25,
      borderRadius: 25 / 2,
      borderWidth: 1.5,
      borderColor: optionsInactiveColor,
    },
    // Setting screen list active radio button. Used On: Setting Screen
    activeRadio: {
      height: 25,
      width: 25,
      borderRadius: 25 / 2,
      borderWidth: 8,
      borderColor: highlightColor,
    },
    // Header font styling for privacy setting screen. Used On: Privacy Setting Screen
    privacySettingsHeader: setHeadingFont({
      size: 22,
      weight: FontWeights.bold,
      color: headingsColor,
    }),
    // Text font styling for privacy setting screen. Used On: Privacy Setting Screen
    privacySettingsItemText: setFont({
      size: 17,
      color: textColor,
      weight: FontWeights.semiBold,
      family: bodyText.family,
    }),
    // Header font styling for privacy setting screen. Used On: Privacy Setting Screen
    privacySettingsHeader: setHeadingFont({
      size: 22,
      weight: FontWeights.bold,
      color: headingsColor,
    }),
    // Text font styling for access denied text. Used On: Access Denied Cover
    accessDeniedHeader: setHeadingFont({
      size: 22,
      weight: FontWeights.bold,
      color: headingsColor,
    }),
    // Text font styling for access denied header. Used On: Access Denied Cover
    accessDeniedText: setFont({
      size: 17,
      color: textColor,
      family: bodyText.family,
    }),
    // Navigation header right icon styles. Used On: Email Invite Message Screen,Group Message Create Postscreen, Email Prefrence Screen,Group Invite Setting Screen,Login Info Screen,Privacy Setting Screen,Cover Photo screen, Photo screen,Setting Screen,Email Invites send Screen,profile Screen
    headerRightButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 14,
      borderRadius: 14,
      backgroundColor: headerIconColor,
      minWidth: 63,
      height: 28,
    },
    // Navigation header right text button font styles. Used On:  Email Invite Message Screen,Group Message Create Postscreen, Email Prefrence Screen,Group Invite Setting Screen,Login Info Screen,Privacy Setting Screen,Cover Photo screen, Photo screen,Setting Screen,Email Invites send Screen,profile Screen
    headerRightButtonText: setFont({
      size: 15,
      color: headerBg,
      weight: FontWeights.bold,
      family: bodyText.family,
    }),
    //Text font styling used for descriptional text. Used On: Email Invite Message Screen, Photo Description screen, Setting About Screen
    helperText: setFont({
      size: 13,
      color: descLightTextColor,
      weight: FontWeights.regular,
      family: bodyText.family,
    }),
    // Radio font styling on Report Screen. Used On: Report Form Screen
    reportRadios: setFont({
      size: 15,
      color: headingsColor,
      weight: FontWeights.bold,
      family: bodyText.family,
    }),
    // Text style. Used On: report form screen header title
    reportHeaderTitle: {
      ...setFont({
        ...bodyText,
        size: 20,
        color: headingsColor,
        weight: FontWeights.semiBold,
      }),
      width: 200,
      textAlign: "center",
    },
    schedulePostHeaderTitle: {
      ...setFont({
        ...bodyText,
        size: 20,
        color: headingsColor,
        weight: FontWeights.semiBold,
      }),
      width: 200,
    },
    // Modal handler style. Used On: Options Modal and Schedule Post Modal
    modalHandleStyle: {
      alignSelf: "center",
      top: -15,
      width: 45,
      height: 5,
      borderRadius: 5,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    // not used
    signUpTitle: {
      marginBottom: 60,
      ...setFont({
        size: 28,
        color: textColor,
        weight: FontWeights.semiBold,
        family: bodyText.family,
      }),
    },
    // Confirm text styling. Used On: Edit profile screen
    nativeConfirmText: {
      ...setFont({
        size: 17,
        color: highlightColor,
        weight: FontWeights.regular,
        family: bodyText.family,
      }),
      paddingTop: 1,
      paddingRight: 2,
    },
    // Cancel text styling. Used On: AppMultiSelectModal
    nativeCancelText: {
      ...setFont({
        size: 17,
        color: greyColor,
        weight: FontWeights.regular,
        family: bodyText.family,
      }),
      paddingTop: 1,
      paddingRight: 2,
    },
    // Search bar text input style. Used On: Search
    searchBarText: {
      ...setFont({
        ...bodyText,
        size: 17,
        color: textColor,
        weight: FontWeights.regular,
      }),
      flex: 1,
      paddingTop: 0,
      paddingBottom: 0,
    },
    // Form input label styling. Used On:  Signup screen, Advanced search screen
    formLabel: setHeadingFont({
      size: 20,
      weight: FontWeights.bold,
      color: headingsColor,
    }),
    // Form sub-label (secondary label) font styling. Used On:  Signup screen, Advanced search screen
    formSubLabel: setFont({
      size: 15,
      color: headingsColor,
      weight: FontWeights.bold,
      family: bodyText.family,
    }),
    // Form input field style. Used On: Privacy setting screen, login info screen, Signup screen, Advanced search screen
    formItemContainer: { paddingBottom: 32 },
    // Form input field style. Used On: Quiz screen, survey screen, Edit profile Screen, Subscription Screen, Signup screen, Advanced search screen, Email Invite Screen, Document Screen, Code Verifcation Screen,Forgot Screen, Login Screen,Activity Screen
    formInput: {
      paddingHorizontal: 16,
      minHeight: 50,
      borderRadius: 10,
      borderColor: inputBorderColorAlt,
      backgroundColor: bodyBg,
    },
    // Form input field text style. Used On: Quiz screen, survey screen, Edit profile Screen, Subscription Screen, Signup screen, Advanced search screen, Email Invite Screen, Document Screen, Code Verifcation Screen,Forgot Screen, Login Screen,Activity Screen
    formInputText: setFont({
      size: 16,
      color: textColor,
      weight: Platform.select({
        ios: FontWeights.medium,
        android: FontWeights.regular,
      }),
      family: bodyText.family,
    }),
    // Textarea style. Used On: Email Invite Screen, Signup screen, Advanced search screen, Document Screen, Edit Profile screen
    formTextArea: { minHeight: 150, paddingTop: 12 },
    // Form dropdown style. Used On: Signup screen, Advanced search screen, Setting screen
    formDropdown: {
      borderRadius: 10,
      minHeight: 48,
      paddingHorizontal: 16,
      backgroundColor: bodyBg,
      borderBottomWidth: 0,
    },
    // Form checkbox outer style. Used On: Signup screen, Advanced search screen
    formCheckboxOuter: { paddingLeft: 16 },
    // Form checkbox inner style. Used On: Signup screen, Advanced search screen
    formCheckboxInner: {
      borderTopColor: borderColorAlt,
      paddingRight: 16,
      minHeight: 48,
    },
    // style used for sign up fields checkbox, single checkbox and container component. Used On: Signup screen, Advanced search screen
    selectContainer: { backgroundColor: bodyBg, borderRadius: 10 },
    // not used
    selectItemOuter: { paddingLeft: 16 },
    // style for signup fields like container. Used On: Signup screen, Advanced search screen
    selectItemInner: {
      borderTopColor: borderColorAlt,
      paddingRight: 16,
      minHeight: 48,
    },
    // Form picker style. Used On: Signup screen, Advanced search screen
    nativeAccessoryText: { color: highlightColor },
    // Edit profile's add another button text style. Used On: Edit profile Screen
    repeaterButtonText: setFont({
      size: 15,
      family: bodyText.family,
      weight: FontWeights.bold,
      color: highlightColor,
    }),
    // View As restore modal header title styles. Used On: Profile Screen
    viewAsRestoreHeaderTitle: setFont({
      size: 15,
      family: bodyText.family,
      weight: FontWeights.regular,
    }),
    // View As restore modal header user font styles. Used On: Profile Screen
    viewAsRestoreHeaderUser: setFont({
      size: 15,
      family: bodyText.family,
      weight: FontWeights.semiBold,
    }),
    // View As screen title font style. Used On: Profile Screen, Course Screen
    viewAsRestoreTitle: setFont({
      size: 15,
      family: bodyText.family,
      weight: FontWeights.regular,
    }),
    // View As screen user name font style. Used On: Profile Screen, Course Screen
    viewAsRestoreUser: setFont({
      size: 15,
      family: bodyText.family,
      weight: FontWeights.semiBold,
    }),
    // Points Screen user points title font style. Used On: Points Screen
    pointsTitle: setFont({
      color: headingsColor,
      family: bodyText.family,
      weight: FontWeights.bold,
      size: 22,
    }),
    // Points Screen awarded points sub title font style. Used On: Points Screen
    pointsSubTitle: setFont({
      color: descLightTextColor,
      family: bodyText.family,
      weight: FontWeights.regular,
      size: 17,
    }),
    // Achievement Title font style. Used On: Achievement screen, BlockedUser screen
    achievementTitle: setFont({
      ...bodyText,
      color: headingsColor,
      weight: FontWeights.semiBold,
      size: 17,
    }),
    // Achievement SubTitle style. Used On: Achievement screen, BlockedUser screen
    achievementSubtitle: setFont({
      ...bodyText,
      color: descLightTextColor,
      weight: FontWeights.regular,
      size: 13,
    }),
    // Acheivement screen content font style. Used On: Achievement screen
    achievementContent: setFont({
      ...bodyText,
      color: textColor,
      weight: FontWeights.regular,
      size: 15,
    }),
    // Achievement screen required step header font style. Used On: Achievement screen
    achievementSheetInnerContent: setFont({
      ...bodyText,
      color: descLightTextColor,
      weight: FontWeights.semiBold,
      size: 13,
    }),
    // Ranks Screen title style. Used On: Ranks screen
    rankTitle: setFont({
      size: 19,
      weight: FontWeights.semiBold,
      family: bodyText.family,
      color: textColor,
    }),
    // not used
    rankDesc: setFont({
      size: 13,
      weight: FontWeights.medium,
      family: bodyText.family,
      color: descLightTextColor,
    }),
    // Profile Cover photo text heading style. Used On: Cover
    profileCoverEditTitle: setFont({
      size: 19,
      weight: FontWeights.semiBold,
      family: bodyText.family,
      color: textColor,
    }),
    // Profile Cover photo text descriptional style. Used On: Cover screen
    profileCoverEditDesc: setFont({
      size: 15,
      weight: FontWeights.regular,
      family: bodyText.family,
      color: descLightTextColor,
    }),
    // Profile Display user name style. Used On: App Lock Screen, Profile screen
    xProfileNicename: setFont({
      size: calcFontSize(14),
      weight: FontWeights.regular,
      family: bodyText.family,
      color: headingsColor,
    }),
    // Profile member joined date style. Used On: Profile screen
    xProfileJoined: setFont({
      size: 14,
      weight: FontWeights.regular,
      family: bodyText.family,
      color: descLightTextColor,
    }),
    // Profile user name style. Used On: App Lock Screen, Profile screen
    xProfileTitle: setFont({
      ...bodyText,
      color: headingsColor,
      weight: FontWeights.bold,
      size: 22,
    }),
    // Profile followers count style. Used On: Profile screen
    xProfileCount: setFont({
      ...bodyText,
      color: headingsColor,
      weight: FontWeights.semiBold,
      size: 17,
    }),
    // Profile follower title  based upon count style. Used On: Profile screen
    xProfileCountTitle: setFont({
      ...bodyText,
      color: descLightTextColor,
      weight: FontWeights.regular,
      size: 13,
    }),
    // Profile group name style. Used On: Profile screen
    xProfileSectionText: setFont({
      color: headingsColor,
      size: 22,
      weight: FontWeights.bold,
      family: bodyText.family,
    }),
    // profile list field item title style. Used On: Profile screen
    xProfileItemTitle: setFont({
      color: headingsColor,
      size: 13,
      family: bodyText.family,
      weight: FontWeights.semiBold,
    }),
    // Profile list item fields value style. Used On: Profile screen
    xProfileItemValue: {
      flexShrink: 1,
      ...setFont({
        color: textColor,
        size: 20,
        family: bodyText.family,
        weight: FontWeights.medium,
      }),
    },
    // Profile list URL link fields style. Used On: Profile screen
    xProfileItemLink: {
      flexShrink: 1,
      ...setFont({
        color: linkColor,
        size: 20,
        family: bodyText.family,
        weight: FontWeights.medium,
      }),
    },
    // Profile list textarea fields style. Used On: Profile screen
    xProfileItemTextArea: {
      ...setFont({
        color: textColor,
        size: 20,
        family: bodyText.family,
        weight: FontWeights.medium,
      }),
      flexShrink: 1,
    },
    // Quiz text input style. Used On: Question screen
    quizTextInput: setFont({
      size: 16,
      weight: FontWeights.regular,
      family: bodyText.family,
      color: textColor,
    }),
    // Style for rendering quiz question. Used On: Question Screen, Quiz Single Screen
    quizQuestionText: setFont({
      size: 16,
      weight: FontWeights.regular,
      color: textColor,
      family: bodyText.family,
    }),
    // Course title style. Used On: Course screen, Lesson Single Screen
    courseHeaderTitle: setFont({
      size: 27,
      color: headingsColor,
      weight: FontWeights.bold,
      family: bodyText.family,
    }),
    // Course subtitle Style. Used On: Learn Topic Single Screen, Lesson Single Screen, Quiz Single Screen
    courseHeaderSubTitle: setFont({
      size: 13,
      color: descLightTextColor,
      weight: FontWeights.medium,
      family: bodyText.family,
    }),
    // General text tyle used in various ways like to show privacy text, group name. Used On: Activity Screen, Document Screen, Group Screen, Add Topic Screen
    activityPostInText: setFont({
      size: 14,
      color: headingsColor,
      weight: FontWeights.medium,
      family: bodyText.family,
    }),
    // Parent group subtitle style. Used On: App header through out app
    parentGroupSubTitle: setFont({
      size: 13,
      color: descTextColor,
      family: bodyText.family,
      weight: FontWeights.regular,
    }),
    // Parent group title style. Used On: App header through out app
    parentGroupTitle: setFont({
      size: 15,
      color: headingsColor,
      family: bodyText.family,
      weight: FontWeights.semiBold,
    }),
    // General Screen title text style. Used On: Forum Single Screen, Blog Screen, Login Screen, Forget Screen, Code Verification Screen
    textHeaderTitle: setFont({
      size: 28,
      color: headingsColor,
      family: appHeadings.family,
      weight: FontWeights.semiBold,
    }),
    //Screen title for Code verification screen
    textHeaderTitleCodeVerification: {
      size: 28,
    },
    //Screen title for Forgot password screen
    textHeaderTitleForgotPassword: {},
    //Confirmation message in code verification screen
    codeVerificationConfirmation: {},
    // Header title style for display userType, userNickname. Used On: Profile Screen & Group Screen
    textHeaderMeta: setFont({
      size: 16,
      color: descTextColor,
      family: bodyText.family,
      weight: FontWeights.regular,
    }),
    // Group screen short description text style. Used On: Group Screen
    textHeaderShortContent: setFont({
      size: 16,
      color: headingsColor,
      family: bodyText.family,
      weight: FontWeights.medium,
    }),
    // Group header action button text style. Used On: Group Screen
    textHeaderActionButton: setFont({
      size: 12,
      color: linkColor,
      family: bodyText.family,
      weight: FontWeights.semiBold,
    }),
    // Widget title font style. Used On Home screen
    textSingleScreenTab: setFont({
      size: 17,
      color: textColor,
      family: bodyText.family,
      weight: FontWeights.semiBold,
    }),
    // not used
    textGroupBreadCrumb: setFont({
      size: 14,
      weight: FontWeights.medium,
      family: bodyText.family,
      color: descTextColor,
    }),
    // Comment text font style. Used On: Blog Screen
    textItemSubtitle: setFont({
      size: 14,
      weight: FontWeights.regular,
      family: bodyText.family,
      color: descTextColor,
    }),
    // not used
    viewAsSwitchButton: { backgroundColor: secondaryButtonBg },
    // Not used yet
    viewAsSwitchButtonLabel: {
      color: secondaryButtonColor,
      fontWeight: FontWeights.semiBold,
    },
    // List load more view style. Used On: Album Screen, Photo Screen
    loadMoreButton: {
      padding: 15,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: primaryButtonBg,
      borderRadius: 20,
      marginHorizontal: GUTTER,
      marginTop: 20,
    },
    // List load more text style. Used On: Album Screen, Photo Screen
    loadMoreButtonText: {
      ...setFont({
        ...bodyText,
        size: Platform.select({ android: 16, ios: 17 }),
        weight: FontWeights.medium,
        color: primaryButtonColor,
      }),
      backgroundColor: "transparent",
    },
    // Shadow for the group header avatar. Used On: Group screen
    shadow: {
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 3,
      shadowColor: blackColor,
      shadowOpacity: 0.15,
      elevation: 1,
      zIndex: 1,
    },
    // Shadow to provide below in group header avatar. Used On: Group screen
    shadowBelow: {
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 1,
      shadowColor: blackColor,
      shadowOpacity: 0.12,
      elevation: 1,
      zIndex: 1,
    },
    // Screen view container style. Used On menu  screen and profile Screens
    container: {
      flex: 1,
      backgroundColor: bodyFrontBg,
    },
    // Title style for button and screen item title . Used On  Group screen, Course screen, Blog screen
    title: setFont({
      ...bodyText,
      size: 18,
      color: textColor,
    }),
    // Title style. Used On: Document Screen & Photo Screen
    heading: setFont({
      ...appHeadings,
      size: 16,
      color: headingsColor,
      weight: FontWeights.medium,
      typography: Typographies.appHeadings,
    }),
    // Group screen action button style. Used On: Group screen and Delete group screen
    boldText: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.bold,
      color: textColor,
    }),
    // General text style used in various screen. File name style in document screen. Used On: Document Screen
    semiboldText: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.semiBold,
      color: textColor,
    }),
    // General text style used in various screen. Used On: Many major and minor module such as quiz screen, album create screen, activity screen & Blog screen.
    text: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.regular,
      color: textColor,
    }),
    // Descriptional text style for cover photo and setting form screen. Used On: Profile Cover screen & Setting Screen
    desc: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.regular,
      color: descTextColor,
    }),
    // Various screen text style used for radio text, label text, title text etc. Used On: Question screen, List screen, Quiz screen, Report Screen, Forum Screen.
    textAlt: setFont({
      ...bodyText,
      size: 14,
      weight: FontWeights.regular,
      color: textColor,
    }),
    // Various screen text style used for radio text, label text, title text etc. Used On: Question screen, List screen, Quiz screen, Report Screen, Forum Screen.
    textAltMedium: setFont({
      ...bodyText,
      size: 14,
      weight: FontWeights.medium,
      color: textColor,
    }),
    // Blog Screen button text style. Used On: Blog Screen
    textAltSemi: setFont({
      ...bodyText,
      size: 14,
      weight: FontWeights.semiBold,
      color: textColor,
    }),
    // Blog screen text style. Used On: Blog screen
    textMeta: setFont({
      ...bodyText,
      size: 13,
      weight: FontWeights.regular,
      color: descLightTextColor,
    }),
    // messages thread date header, Link handling setting header
    textMetaSemiBold: setFont({
      ...bodyText,
      size: 14,
      weight: FontWeights.semiBold,
      color: descLightTextColor,
    }),
    // not used
    xProfileSubtitle: setFont({
      ...bodyText,
      size: 13,
      weight: FontWeights.regular,
      color: headingsColor,
    }),
    // Various screen text style. Used On: Quiz Result screen, Product screen, Question screen, Notification list item
    regularText: {
      ...setFont({
        ...bodyText,
        size: 15,
        weight: FontWeights.regular,
        color: textColor,
      }),
      backgroundColor: "transparent",
    },
    // Html Page text style. Used On: Forum screen, Paragraph Screen, Question Essay Screen, Forums topic screen
    textHtml: setFont({
      ...bodyText,
      size: 15,
      weight: FontWeights.regular,
      color: textColor,
    }),
    // Notification content text style. Used On: Notification screen
    notificationHtml: setFont({
      ...bodyText,
      size: 15,
      weight: FontWeights.medium,
      color: textColor,
    }),
    // Activity header Html Style. Used On: Activity screen
    activityHtml: setFont({
      ...bodyText,
      size: 15,
      weight: FontWeights.regular,
      color: textColor,
    }),
    activityHtmlrawtext: setFont({
      ...bodyText,
      size: 15,
      weight: FontWeights.regular,
      color: textColor,
    }),
    activityHtmlp: setFont({
      ...bodyText,
      size: 15,
      weight: FontWeights.regular,
      color: textColor,
    }),
    activityHtmla: setFont({
      ...bodyText,
      size: 15,
      weight: FontWeights.semiBold,
      color: textColor,
    }),
    // not used
    countText: setFont({
      ...bodyText,
      size: 34,
      weight: FontWeights.regular,
      color: textColor,
    }),
    // Small text style. Used On: Various screens like Menu Screen, Forgot password screen & Auth screen
    textSmall: {
      ...setFont({
        ...bodyText,
        size: 14,
        weight: FontWeights.regular,
        color: shadeColor(textColor, 0.64),
      }),
      backgroundColor: "transparent",
    },
    // Button color style. Used On: Export Data Screen, Advanced Search Screen
    primaryButtonColor: {
      color: primaryButtonColor,
    },
    // Button text color style. Used On: Export Data Screen, Advanced Search Screen
    primaryButtonColorText: setFont({
      ...bodyText,
      size: 15,
      weight: FontWeights.bold,
    }),
    // Link style. Used On: Filter Screen,Blog Screen, Course screen, Login Screen
    link: {
      ...setFont({
        ...bodyText,
        size: 14,
        weight: FontWeights.regular,
        color: linkColor,
      }),
      backgroundColor: "transparent",
    },
    // Blog delete & report button style. Used On: Blog Screen
    deleteLink: {
      ...setFont({
        ...bodyText,
        size: 14,
        weight: FontWeights.regular,
        color: warningColor,
      }),
      backgroundColor: "transparent",
    },
    // Cancel search text style. Used On: Search Screen
    cancelSearch: {
      ...setFont({
        ...bodyText,
        size: 17,
        weight: FontWeights.regular,
        color: linkColor,
      }),
      backgroundColor: "transparent",
    },
    // Blog screen icon button text style. Used On: Blog Screen
    // Group message screen list select unselect text style. Used On: Group Screen
    // widget title see more label text style. Used On Home Screen
    seeLink: {
      ...setFont({
        ...bodyText,
        size: Platform.select({ ios: 17, android: 16 }),
        weight: FontWeights.regular,
        color: linkColor,
      }),
      backgroundColor: "transparent",
    },
    // Various screen's label text style. Used On: Profile screen, Edit profile screen, Document screen, Topic screen
    linkRegular: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.regular,
      color: linkColor,
    }),
    // not used
    linkArrow: {
      width: 10,
      height: 8,
      marginRight: 6,
    },
    // Forward arrow style. Used On: Login screen, Social Login screen, Course screen
    linkArrowRight: {
      width: 10,
      height: 8,
      marginLeft: 6,
    },
    // Previous button, Next button, lesson complete button, mark as complete button, login as guest button, login with email button view style.
    // Used On: Couuse screen, topic screen, login screen, social login screen.
    linkWithArrow: {
      flexDirection: "row",
      alignItems: "center",
    },
    // List view style. Used On: Group list and common list screen
    listWrap: {
      flex: 1,
      backgroundColor: bodyFrontBg,
    },
    // Text input style. Used On: quiz form screen, form screen, add topic screen, link account screen, login screen, reply screen
    input: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.regular,
      color: textColor,
    }),
    // Quiz form invalid text field style. Used On: Quiz screen
    invalidField: setFont({
      ...bodyText,
      size: 12,
      weight: FontWeights.regular,
      color: warningColor,
    }),
    // Input description. Used on: Advanced search
    inputDesc: setFont({
      ...bodyText,
      size: 12,
      weight: FontWeights.regular,
      color: descTextColor,
    }),
    // not in use
    label: {
      ...setFont({
        ...bodyText,
        size: 12,
        weight: FontWeights.regular,
        color: textColor,
      }),
      marginBottom: 7,
    },
    // Form page text input wrap view style. Used On: Quiz screen, Link Account screen, Login screen, Reply screen
    inputWrap: {
      position: "relative",
      paddingTop: 0,
      paddingBottom: 0,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    // Matrix Question type style. Used On: Quiz screen
    quizInput: {
      ...setFont({
        ...bodyText,
        size: 14,
        weight: FontWeights.regular,
        color: textColor,
      }),
      paddingLeft: 10,
      paddingRight: 10,
      height: 36,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: borderColor,
    },
    // Button label text style. Used On: Menu item screen
    buttonLabel: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.semiBold,
      color: secondaryButtonColor,
    }),
    // Input label text style. Used On: Reset password screen
    resetPasswordInputLabel: {
      ...setFont({
        ...bodyText,
        size: 17,
        weight: FontWeights.medium,
        color: secondaryButtonColor,
      }),
      marginBottom: 10,
    },
    // Reset password instructions text style. Used On: Reset password screen
    resetPasswordInstructions: {
      ...setFont({
        ...bodyText,
        size: 15,
        weight: FontWeights.regular,
        color: descTextColor,
      }),
      paddingVertical: 10,
    },
    // Reset password instructions steps text style. Used On: Reset password screen
    resetPasswordInstructionsSteps: setFont({
      ...bodyText,
      size: 13,
      weight: FontWeights.medium,
      color: descLightTextColor,
    }),
    // group header member avatar button style. Used On: group screen
    singleScreenActionButton: {
      paddingHorizontal: 22,
      height: 28,
      borderRadius: 37 / 2,
      backgroundColor: whiteColor,
    },
    // Input text style used in Edit profile screen
    // Dropdown text style. Used On setting form screen
    profileInputText: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.medium,
      color: textColor,
    }),
    // Date picker view style. Used On: edit profile screen
    profileInput: {
      paddingHorizontal: 16,
      minHeight: 48,
      borderRadius: 10,
      borderColor: inputBorderColorAlt,
      backgroundColor: bodyBg,
    },
    // Dropdown style. Used On: Edit Profile screen
    profileDropdown: {
      borderRadius: 10,
      minHeight: 48,
      paddingHorizontal: 16,
      backgroundColor: bodyBg,
      borderBottomWidth: 0,
    },
    // Profile field label text style. Used On: Edit Profile screen
    profileInputLabel: setFont({
      ...bodyText,
      size: 20,
      weight: FontWeights.bold,
      color: headingsColor,
    }),
    // Form item descriptional field text style. Used On: Email invites screen Edit Profile screen
    profileInputDesc: setFont({
      ...bodyText,
      size: 13,
      weight: FontWeights.regular,
      color: descLightTextColor,
    }),
    // Home page bottom tab icon wrapper style. Used On: Home Screen
    profileItemIconWrap: {
      width: 22,
    },
    // Home page bottom tab icon  style. Used On: Home Screen
    profileItemIcon: {
      alignSelf: "center",
    },
    // Global button view style. Used On: almost every screen
    button: {
      height: 46,
      backgroundColor: primaryButtonBg,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderRadius: 12,
    },
    // Global secondary button style. Used On: almost every screen
    buttonSecondary: {
      height: 46,
      backgroundColor: secondaryButtonBg,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderRadius: 12,
    },
    // Global button text style. Used On: almost every screen
    buttonPrimaryLabel: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.bold,
      color: primaryButtonColor,
    }),
    // Global secondary button text style. Used On: almost every screen
    buttonSecondaryLabel: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.bold,
      color: secondaryButtonColor,
    }),
    // Add item button text style. Used On: email invite composer screen
    buttonText: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.regular,
      color: secondaryButtonColor,
    }),
    // List button style. Used On: list screen in the app
    listButton: {
      height: 50,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    // product screen button style. Used On: Product screen, subscriptions screen
    roundButton: {
      height: 38,
      borderRadius: 19,
    },
    // Course introductional video play button style. Used On: course screen
    playButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderStyle: "solid",
      borderWidth: 1.2,
      borderColor: whiteColor,
      padding: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    // upload media button style. Used On: Feedback screen, Photo screen, cover screen
    primaryButtonContainer: { backgroundColor: primaryButtonBg },
    // delete media button style. Used On: Feedback screen, Photo screen, cover screen
    secondaryButtonContainer: { backgroundColor: secondaryButtonBg },
    // not used
    primaryButtonLabel: { color: primaryButtonColor },
    // not used
    secondaryButtonLabel: { color: secondaryButtonColor },
    // Login button, forget button style
    // Used On: Login screen, Forgot Passwoard Screen
    authButtonContainer: { backgroundColor: authButtonBgColor },
    //labels of  Login button, forget button style
    // Used On: Login screen, Forgot Passwoard Screen
    authButtonLabel: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.semiBold,
      color: authButtonTextColor,
    }),
    // Signup button, verification code button
    // Used On: Signup screen, Code Verification Screen
    regButtonContainer: { backgroundColor: regButtonBgColor },
    //labels of Signup button, verification code button
    // Used On: Signup screen, Code Verification Screen
    regButtonLabel: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.semiBold,
      color: regButtonTextColor,
    }),
    twitterLoginButton: {},
    facebookLoginButton: {},
    googleLoginButton: {},
    appleLoginButton: {},
    // Screens bottom button style. Used On: Course screen Style, social login screen, Subscription screen
    footerButton: {
      height: 48,
      backgroundColor: bodyFrontBg,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    // Inner button style. Used On: App Screens, Notiication Screen, Lists Screens
    buttonInner: {
      flexDirection: "row",
      alignItems: "center",
    },
    mediaItem: {
      width: 80,
      height: 80,
      marginRight: 15,
      resizeMode: "cover",
    },
    // Logo Style. Used On: Social Login screen
    logo: {
      width: "100%",
      height: "100%",
      maxHeight: 100,
      maxWidth: 150,
      resizeMode: "contain",
    },
    // Header style. Used On: Login Screen, link account screen, code verification screen, forgot password screen
    authHeader: {
      flex: 1,
      marginTop: 50,
    },
    // Screen text style. Used On:login screen, urvey screen, profile block for home screen, link account screen
    screenTitle: {
      ...setFont({
        ...bodyText,
        weight: FontWeights.bold,
        color: headingsColor,
        size: 20,
      }),
      marginTop: 14,
      backgroundColor: "transparent",
      marginBottom: 14,
    },
    // Screen header style. Used On: course screen, profile list screen, course material screen, course quizzes screen
    iosStyleScreenTitle: {
      ...setListHeaderFont({
        color: headerColor,
        weight: FontWeights.bold,
        size: 34,
      }),
      // marginBottom: 9
    },
    // Screen subtitle style. Used On: Over the whole app
    iosStyleScreenSubtitle: {
      ...setListHeaderFont({
        color: descLightTextColor,
        weight: FontWeights.bold,
        size: 16,
      }),
    },
    // Title style. Used On: Single group screen
    titleWithButton: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 14,
      marginBottom: 14,
    },
    // Short content text style. Used On: Group screen, Link account screen
    screenDescription: {
      textAlign: "center",
      backgroundColor: "transparent",
      width: 279,
    },
    // Group header details text view style. Used On: group screen
    // Profile block user points detail view style. Used On: home screen
    screenMetas: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
      backgroundColor: "transparent",
    },
    // Screens inner text style. Used On: profile blocks home screen, cretificate screen, group screen, more screen
    screenMeta: {
      ...setFont({
        ...bodyText,
        size: 14,
        weight: FontWeights.regular,
        color: descLightTextColor,
      }),
      backgroundColor: "transparent",
    },
    // Single group screen admin view style
    screenHeaderBottom: {
      marginTop: "auto",
      flexDirection: "row",
      alignItems: "center",
    },
    // Quiz result list view style. Used On: Quiz details screen
    listItem: {
      paddingTop: 25,
      paddingRight: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      position: "relative",
    },
    // Forum topic title & sub forum title text style. Used On: single forum screen
    forumListTitle: setFont({
      ...bodyText,
      size: 21,
      weight: FontWeights.medium,
      color: textColor,
    }),
    // Forum item view style. Used On: forum list screen
    forumListItem: {
      paddingHorizontal: GUTTER,
      position: "relative",
    },
    // reply list item view style. Used On: notification reply item and thoughout the app reply view
    replyListItem: {
      paddingBottom: 16,
      paddingHorizontal: 16,
    },
    // List item header view. Used On: topic single screen, more screen
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    // List item content view. Used On: topic single screen, more screen
    itemContent: {
      marginTop: 7,
      marginLeft: 42,
      marginBottom: 12,
    },
    // Topic single screen header's footer view style
    // Merge topic screen footer view style
    itemFooterMeta: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 43,
    },
    // List item footer view style. Used On: document screen, forum single screen, topic single screen
    itemFooter: {
      flexDirection: "row",
      alignItems: "center",
    },
    // List item left side view style. Used On: more screen, Reply screen
    itemLeft: {
      flexDirection: "row",
      alignItems: "flex-start",
      flex: 1,
    },
    // Name text style. Used On: setting screen, merge topic screen, reply screen
    itemName: {
      ...setFont({
        ...bodyText,
        size: 17,
        weight: FontWeights.medium,
        color: headingsColor,
      }),
      backgroundColor: "transparent",
    },
    // Course status text style. Used On: course screen
    itemText: {
      ...setFont({
        ...bodyText,
        size: 15,
        weight: FontWeights.regular,
        color: textColor,
      }),
      backgroundColor: "transparent",
    },
    // Course header author name text style. Used On: course screen
    itemAuthorName: {
      ...setFont({
        ...bodyText,
        size: 17,
        weight: FontWeights.semiBold,
        color: headingsColor,
      }),
      backgroundColor: "transparent",
    },
    // App screens inner text style. Used On: topic screen, group screen, Blog screen, forum screen, result screen, profile screen, Lesson screen
    itemMeta: {
      ...setFont({
        ...bodyText,
        size: 13,
        color: descLightTextColor,
        weight: FontWeights.regular,
      }),
      backgroundColor: "transparent",
    },
    // Icon style. Used On: filter list and Topic single screen
    optionItemIcon: {
      height: 24,
      width: 24,
      tintColor: textColor,
      marginRight: 13,
    },
    // not used
    progressCount: {
      ...setFont({
        ...bodyText,
        size: 17,
        color: descLightTextColor,
        weight: FontWeights.regular,
      }),
      backgroundColor: "transparent",
    },
    // Forum header title text style. Used On: Forum screen
    linkMeta: setFont({
      ...bodyText,
      size: 16,
      color: linkColor,
      weight: FontWeights.regular,
    }),
    // Date text style. Used On: message screen, reply screen, notification screen
    itemLightMeta: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: descLightTextColor,
        weight: FontWeights.regular,
      }),
      backgroundColor: "transparent",
    },
    // Dot seprator style. Used On: blog screen, course screen, forum screen, group screen, topic screen, document screen
    dotSep: {
      width: 3,
      height: 3,
      marginLeft: 8,
      marginRight: 8,
      backgroundColor: descLightTextColor,
      borderRadius: 2,
    },
    // Widget title style. Used On: course widget, group widget
    widgetItemTitle: setFont({
      ...bodyText,
      size: 17,
      weight: FontWeights.semiBold,
    }),
    // screen inner text and button style. Used On: survet screen, topic screen, forum screen, certificates screen
    itemTitle: setFont({
      ...bodyText,
      size: 17,
      weight: FontWeights.semiBold,
      color: textColor,
    }),
    // Sub forum title text style. Used On: sub forum screen
    subForumTitle: setFont({
      ...bodyText,
      size: 13,
      color: textColor,
      weight: FontWeights.semiBold,
    }),
    // Title text style. Used On: Notification screen, move reply screen, merge topic screen, split reply screen
    itemTopicTitle: setFont({
      ...bodyText,
      size: 16,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // List item descriptional text style. Used On: forum screen, edit profile screen, product single screenemail invites send screen
    itemDesc: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.regular,
      color: descTextColor,
    }),
    // Large content text style. Used On: subscription screen, topic single screen, course screen
    itemAltDesc: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.regular,
      color: lightTextColor,
    }),
    // Member item view style. Used On: member screen
    itemAvatar: {
      marginRight: 10,
      width: 32,
      height: 32,
      borderRadius: 15,
      backgroundColor: "transparent",
    },
    // Sub-forum list view style. Used On: forum screen
    itemSubforums: {
      maxWidth: 260,
    },
    // Topic item parent view style. Used On: topic screen
    itemSticky: {
      backgroundColor: shadeColor(notifColor, 0.2),
      borderLeftColor: notifColor,
      borderLeftWidth: 2,
    },
    // Topic item parent view style. Used On: topic screen
    itemClosed: {
      opacity: 0.6,
      backgroundColor: bodyBg,
      borderLeftColor: borderColor,
      borderLeftWidth: 2,
    },
    // Parent view style. Used On: new reply item and topic single screen
    itemSpam: {
      backgroundColor: shadeColor(warningColor, 0.3),
      borderLeftColor: warningColor,
      borderLeftWidth: 2,
    },
    // Popup dialog style. Used On: activity screen
    dialogPopup: {
      borderRadius: 8,
      flexDirection: "column",
    },
    // Popup dialog inner style. Used On: activity screen
    dialogPopupInner: {
      paddingVertical: 8,
    },
    // Popup dialog button style. Used On: activity screen
    dialogPopupButton: {
      paddingVertical: 10,
    },
    // general view style. Used On: various screen in the application
    bottomBorder: {
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    // view style. Used On: document screen, block modal, report form screen
    topBorder: {
      borderTopColor: borderColor,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    // avatar wrapper view. Used On: photo description screen, learn topic single screen, Lesson Single screen
    avatarWrap: {
      marginRight: 10,
    },
    // not in used yet
    listSeparator: {
      height: 22,
      backgroundColor: bodyBg,
    },
    // Seperator style for activity list screen
    listSeparatorBordered: {
      borderTopColor: borderColor,
      borderTopWidth: StyleSheet.hairlineWidth,
      marginHorizontal: GUTTER,
    },
    // Bottom tab bar menu label style. Used On: home screen
    menuLabelStyle: setFont({
      family: appTabBar.family,
      color: appTabBar.color || textColor,
      size: appTabBar.size || 10,
      weight: FontWeights.regular,
    }),
    // Parent view style. Used On: more screen, setting about screen, setting privacy screen, setting screen, setting push screen
    settingsPage: {
      backgroundColor: bodyBg,
      flex: 1,
    },
    // Separator view style. Used On: group single screen, setting about screen, setting privacy screen, setting push screen, setting screen, email preference screen
    settingsSeparator: {
      marginTop: 22,
      height: 0,
      marginBottom: 0,
    },
    // Icon style for group single screen, setting screen
    settingsItemIcon: {
      alignSelf: "center",
      height: 30,
      width: 30,
    },
    // More icon style. Used On: more screen
    moreItemIcon: {
      alignSelf: "center",
      height: 30,
      width: 30,
    },
    // Setting list item title style. Used On: group single screen, merge topic screen, more screen, setting screen,
    settingsItemTitle: setAppMenusFont({
      ...appMenus,
      size: 17,
      color: textColor,
      weight: FontWeights.semiBold,
    }),
    // Setting list text style. Used On: Setting screen
    settingsTitleInfo: {
      ...setAppMenusFont({
        ...appMenus,
        size: 16,
        weight: FontWeights.semiBold,
        color: descLightTextColor,
      }),
      marginRight: 16,
    },
    // Seperator style on forum single screen, select screen
    separator: {
      backgroundColor: borderColor,
    },
    // Logout view style. Used On: setting screen
    logout: {
      height: 60,
      backgroundColor: bodyFrontBg,
      alignItems: "center",
      justifyContent: "center",
    },
    // Logout text style. Used On: setting screen
    logoutInner: setFont({
      ...bodyText,
      size: 16,
      color: warningColor,
      weight: FontWeights.regular,
    }),
    // Icon style for filter dropdown
    subFilterIcon: {
      width: "100%",
    },
    // Search wrapper style used on group picker modal
    panelSimple: {
      backgroundColor: filterBottomSheetBg,
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
      padding: 15,
    },
    // Parent view style. Used On: Modal and bottomsheet header
    panelHeader: {
      minHeight: BOTTOM_SHEET_HEADER_HEIGHT,
      backgroundColor: filterBottomSheetBg,
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      justifyContent: "space-between",
      paddingLeft: 20,
      paddingRight: 16,
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
    },
    // Parent view style. Used On: album single list pure, topic single screen and action sheet button wrapper
    panel: {
      backgroundColor: filterBottomSheetBg,
      paddingTop: 12,
      paddingBottom: 20,
      shadowColor: whiteColor,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      zIndex: 1,
      height: "100%",
    },
    // View style. Used On: Document screen and filter list
    panelInner: {
      paddingTop: 12,
      paddingHorizontal: 20,
    },
    // sub filter text style. Used On: fitler list
    panelSubtitleText: {
      ...setFont({
        ...bodyText,
        size: 13,
        color: descLightTextColor,
        weight: FontWeights.semiBold,
      }),
      textTransform: "uppercase",
      marginTop: 8,
    },
    // not used
    panelSubtitle: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: borderColor,
      paddingBottom: 7,
    },
    panelSubtitleAlt: {},
    // Text style. Used On: blog screen product screen, my library screen, sign up screen
    filterTitle: {
      ...setFont({
        ...bodyText,
        size: 20,
        color: headingsColor,
        weight: FontWeights.semiBold,
      }),
      marginRight: 8,
    },
    // Photo delete button text style. Used On: photo screen
    bottomSheetAlertTitle: {
      ...setFont({
        ...bodyText,
        size: 15,
        color: headingsColor,
        weight: FontWeights.semiBold,
      }),
      marginRight: 8,
    },
    // View style. Used On: topic single screen, more screen, block user screen
    roundBox: {
      marginTop: 12,
      borderRadius: 10,
      backgroundColor: bodyFrontBg,
      overflow: "hidden",
    },
    // View style to sgow list item. Used On: topic single screen  and filter list
    filterListItem: {
      marginLeft: 16,
      paddingRight: 20,
      justifyContent: "center",
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: borderColor,
      height: 52,
    },
    // Active filter list view style. Used On: filter list
    activeListFilter: {
      color: textColor,
    },
    // Active background view style. Used On: activity privacy screen and filter list
    activeBg: {
      backgroundColor: shadeColor(linkColor, 0.08),
    },
    // Active border view style. Used On: activity privacy screen and filter list
    activeBorder: {
      borderColor: shadeColor(linkColor, 0.4),
      borderWidth: StyleSheet.hairlineWidth,
    },
    // Text style. Used On: profile header
    activeText: {
      fontWeight: FontWeights["medium"],
      color: linkColor,
    },
    // Header view style. Used On: course materials screen, course quizzes screen, course section screen,
    iosFilterHeader: {
      marginTop: 10,
      paddingHorizontal: GUTTER,
    },
    // View style. Used On: activity filter list and filter list
    iosFilterWrap: {
      borderColor: borderColorAlt,
    },
    // View style. Used On: filter list header
    iosFilterWrapInner: {
      height: LIST_FILTER_HEIGHT,
      paddingLeft: GUTTER,
      flexDirection: "row",
      alignItems: "center",
    },
    // Bottom view style. Used On: filter list header
    iosFilterBottomBorder: {
      marginHorizontal: GUTTER,
      borderColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    // Single filter wrap style  used for filter list
    iosSingleFilterWrap: {
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      height: 30,
      borderWidth: 1,
    },
    // Single filter text style  used for filter list
    iosSingleFilterText: setFont({
      ...bodyText,
      size: 14,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // Parent view style for tab bar
    filter: {
      backgroundColor: filterBg,
      zIndex: 1,
    },
    // Inner text style. Used On: course single screen
    courseExcerpt: {
      ...setFont({
        ...bodyText,
        size: 17,
        color: textColor,
        weight: FontWeights.regular,
      }),
      lineHeight: 25,
    },
    // Bubble icon view style. Used On: document scren, more screen, profile screen, social group screen
    newFilterBubble: {
      borderRadius: 10,
      height: 20,
      minWidth: 30,
      paddingHorizontal: 4,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: shadeColor(primaryColor, 0.1),
      marginLeft: 4,
    },
    // Bubble icon text style. Used On: document screen, more screen, profile screen, social group screen
    newFilterBubbleText: {
      ...setFont({
        ...bodyText,
        size: 11,
        color: primaryColor,
        weight: FontWeights.heavy,
      }),
      marginHorizontal: 3,
    },
    // Filter bubble count style. Used On: tab bar screen
    filterBubble: {
      borderRadius: 6,
      height: 20,
      minWidth: 20,
      paddingHorizontal: 4,
      backgroundColor: filterBg,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
    },
    // Filter bubble text style. Used On: tab bar screen
    filterBubbleText: setFont({
      ...bodyText,
      size: 11,
      color: linkColor,
      weight: FontWeights.bold,
    }),
    // Filter line style. Used On: tab bar screen
    filterLine: {
      borderBottomColor: borderColor,
      borderBottomWidth: 1,
    },
    // Filter row style. Used On: buddy press filter
    filtersRow: {
      flexDirection: "row",
      alignItems: "flex-end",
    },
    // not used
    filtersMain: {
      flex: 1,
    },
    // Active filter view style. Used On: tab bar screen
    activeFilter: {
      fontWeight: FontWeights.medium,
      borderBottomColor: highlightColor,
      opacity: 1,
    },
    // Filter text style. Used On: filter list, tab bar screen, topic single screen
    filterText: setFont({
      ...bodyText,
      size: 17,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // View style. Used On: merge topic screen, move reply screen, setting push screen, split reply screen
    notificationBox: {
      backgroundColor: shadeColor(notifColor, 0.2),
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: borderColor,
    },
    // not used
    notificationStatusAccepted: setFont({
      ...bodyText,
      size: 14,
      color: successColor,
      weight: FontWeights.regular,
    }),
    // not used
    notificationStatusRejected: setFont({
      ...bodyText,
      size: 14,
      color: warningColor,
      weight: FontWeights.regular,
    }),
    // Text style. Used On: merge topic screen, move reply screen, setting push screen, split reply screen
    notificationBoxText: {
      ...setFont({
        ...bodyText,
        size: 12,
        color: notifColor,
        weight: FontWeights.regular,
      }),
      lineHeight: Math.ceil(calcFontSize(12) * 1.17),
    },
    // Item view style. Used On: merge topic screen, move reply screen, setting  screen, split reply screen
    itemBox: {
      backgroundColor: bodyBg,
      paddingHorizontal: 16,
      paddingTop: 15,
      paddingBottom: 17,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: borderColor,
    },
    // not used
    itemBoxInner: {
      backgroundColor: bodyFrontBg,
      paddingVertical: 20,
      paddingHorizontal: 17,
    },
    itemBoxTitle: {},
    // row view style. Used On: through out the app
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    // not used
    widgetNotif: {
      paddingTop: 14,
      paddingRight: 16,
      paddingBottom: 7, //12 - 5
      paddingLeft: 16,
    },
    // widget inner style for widget screen. Used On: home screen
    widgetInner: {
      paddingVertical: 25,
    },
    // widget header style for widget title. Used On: home screen
    widgetHeader: {
      alignItems: "flex-end",
      marginBottom: 18,
      paddingHorizontal: GUTTER,
    },
    // widget content style for forum/topic/users widget. Used On: home screen
    widgetContent: {
      paddingHorizontal: GUTTER,
    },
    // widget border style for activity/notification/progress/forum/topic/users widget. Used On: home screen
    widgetBorder: {
      marginHorizontal: Platform.select({
        ios: GUTTER,
        android: GUTTER,
      }),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: borderColor,
    },
    // not used
    widgetNotifTitle: setFont({
      ...bodyText,
      size: 14,
      color: textColor,
      weight: FontWeights.medium,
    }),
    // widget item description. Used On: quiz result screen and home screen
    widgetItemDesc: setFont({
      ...bodyText,
      size: 13,
      color: descTextColor,
      weight: FontWeights.regular,
    }),
    // widget item large description. Used On: course widget screen
    widgetItemDescFat: setFont({
      ...bodyText,
      size: 13,
      color: textColor,
      weight: FontWeights.medium,
    }),
    // widget title style used for widget. Used On: home screen
    widgetTitle: {
      ...setHeadingFont({
        color: headingsColor,
        size: 26,
        weight: FontWeights.semiBold,
        headingTag: "h5",
      }),
      flex: 1,
      flexWrap: "wrap",
    },
    // widget see link style. Used On: home screen
    widgetSeeLink: {
      paddingLeft: 10,
    },
    // not used
    widgetProgressItemText: {
      ...setFont({
        ...bodyText,
        size: 13 * Math.min(DEVICE_WIDTH / 420, 1),
        color: textColor,
        weight: FontWeights.bold,
      }),
      backgroundColor: "transparent",
      lineHeight: Math.ceil(calcFontSize(11) * 1.46),
    },
    // action button wrapper view. Used On: Thourgh out the app
    actionButtonWrap: {
      marginLeft: 16,
      paddingVertical: 15,
      borderTopColor: borderColor,
    },
    // button view style. Used On: Various menu screens
    wrappedButton: {
      height: FontManager.applyFontHeightAdjustment(30, Typographies.bodyText),
      backgroundColor: secondaryButtonBg,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    // icon button view style. Used On: filter list
    wrappedIconButton: {
      width: 48,
      height: 48,
      backgroundColor: shadeColor(whiteColor, 0.18),
      borderRadius: 24,
    },
    // Round icon button style. Used On: Throught out the app
    wrappedIconButtonHighlight: {
      width: 48,
      height: 48,
      backgroundColor: highlightColor,
      borderRadius: 24,
    },
    // button view style
    wrappedActionIcon: {
      backgroundColor: filterBg,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
    },
    // action icon text button style
    actionIconText: setFont({
      ...bodyText,
      size: 12,
      color: textColor,
      weight: FontWeights.semiBold,
    }),
    // button text style. Used On: group screen, block user screen,notification screen, profile screen
    wrappedTextButton: {
      paddingHorizontal: 16,
      borderRadius: 14,
      height: FontManager.applyFontHeightAdjustment(28, Typographies.bodyText),
      minWidth: 50,
    },
    // button text style. Used On: group screen, block user screen,notification screen, profile screen
    wrappedTextButtonLabel: setFont({
      ...bodyText,
      size: 15,
      color: linkColor,
      weight: FontWeights.semiBold,
    }),
    quickLinksContainer: {},
    // text style. Used On: members screen
    restCount: setFont({
      ...bodyText,
      size: 11,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // not used
    drawerMeta: {
      ...setFont({
        ...bodyText,
        size: 11,
        color: descLightTextColor,
        weight: FontWeights.regular,
      }),
      lineHeight: Math.ceil(calcFontSize(11) * 1.45),
    },
    // not used
    sitesTitle: setFont({
      ...bodyText,
      size: 38,
      color: textColor,
      weight: FontWeights.bold,
    }),
    // blog name style. Used On: Site selection screen and Auth site selection screen, Email invite message screen
    siteTitle: {
      flex: 1,
      ...setFont({
        ...bodyText,
        size: 17,
        color: textColor,
        weight: FontWeights.medium,
      }),
    },
    // not used
    userHandle: {
      marginBottom: 14,
      color: descTextColor,
    },
    // user full name text style. Used On: more screen
    moreName: setFont({
      ...appMenus,
      size: 19,
      color: textColor,
      weight: FontWeights.semiBold,
    }),
    // header title text style used app header
    appHeaderTitle: {
      ...setFont({
        ...typography.appHeaderTitle,
        size: 17,
        color: headerColor,
        weight: FontWeights.semiBold,
      }),
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "transparent",
    },
    // content style. Used On: home screen, Quiz single screen, Blog screen
    content: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: textColor,
        weight: FontWeights.regular,
      }),
      lineHeight: calcFontSize(16 * 1.47),
    },
    contentPlain: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: textColor,
        weight: FontWeights.regular,
      }),
    },
    // link content style. Used On: home screen, blog screen
    linkContent: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: linkColor,
        weight: FontWeights.regular,
      }),
      //		textDecorationLine: "none"
    },
    // caption text style. Used On: album screen, course screen, audio block, video block, quote block, lesson single screen
    caption: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: descLightTextColor,
        weight: FontWeights.regular,
      }),
      textAlign: "center",
      marginTop: 10,
    },
    // not used
    borderTop: {
      borderTopColor: borderColor,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    // global header style. Used On: app header
    header: {
      backgroundColor: headerBg,
      borderBottomColor: "transparent",
      elevation: 0,
      shadowOpacity: 0,
      paddingLeft: 10,
      paddingRight: 10,
    },
    // header style. Used On: group single screen and link account screen
    headerTransparent: {
      borderBottomColor: "transparent",
      elevation: 0,
      shadowOpacity: 0,
      paddingLeft: 10,
      paddingRight: 10,
    },
    // header border style. Used On: app header
    headerBorder: {
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    // header logo style. Used On: app header
    headerLogo: {
      width: "100%",
      flex: 1,
      alignItems: "center",
    },
    // header title style. Used On: app header
    headerCustomTitle: {
      marginHorizontal: 16,
      maxWidth: DEVICE_WIDTH * 0.39,
      alignItems: "center",
    },
    // header left button view style. Used On: app header
    headerButtonLeft: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    // header right button view style. Used On: app header
    headerButtonRight: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "flex-end",
    },
    // not used
    headerTitle: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    // header title text style. Used On: through out app
    headerText: {
      ...setFont({
        ...bodyText,
        size: 17,
        color: headerIconColor,
        weight: FontWeights.medium,
      }),
      maxWidth: DEVICE_WIDTH * 0.2,
    },
    // save button text style used in app
    // cancel button text style used in app
    headerTextButton: {
      padding: 5,
    },
    // header left text style. Used On: many screens
    headerTextButtonLeft: {
      padding: 5,
      marginLeft: 10,
    },
    // header right text style. Used On: many screens
    headerTextButtonRight: {
      padding: 5,
      marginRight: 10,
    },
    // not used
    headerLeft: {
      position: "relative",
      left: -5,
    },
    // not in used yet
    headerRight: {
      position: "relative",
      right: -5,
    },
    // empty icon style. Used On: empty list screen, quiz offline scree, email invite screen, quiz single screen
    emptyIcon: {
      marginBottom: 24,
      height: 90,
      minWidth: 90,
      opacity: 0.8,
      tintColor: shadeColor(descLightTextColor, 0.4),
    },
    // empty text style. Used On: empty list screen, quiz offline scree, quiz single screen
    emptyTitle: {
      ...setFont({
        ...bodyText,
        size: 20,
        textAlign: "center",
        color: descLightTextColor,
        weight: FontWeights.semiBold,
      }),
      marginBottom: 1,
    },
    // empty quiz text style. Used On: quiz offline screen and quiz single screen
    emptyDesc: {
      ...setFont({
        ...bodyText,
        size: 15,
        textAlign: "center",
        color: shadeColor(descLightTextColor, 0.4),
        weight: FontWeights.regular,
      }),
      lineHeight: calcFontSize(20),
      marginBottom: 1,
    },
    // header cover image style. Used On: group single screen
    coverImage: {
      flex: 1,
      width: "100%",
    },
    // section header style. Used On: more screen, setting push screen, email preferance screen
    sectionHeader: setHeadingFont({
      color: shadeColor(headingsColor, 0.4),
      size: 13,
      weight: FontWeights.semiBold,
    }),
    // overlay view style. Used On: video screen, cover screen, group single screen
    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: customColors.sectionHeader || primaryColor,
      opacity: 0.5,
    },
    // not in used yet
    courseOverlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: customColors.sectionHeader || primaryColor,
      opacity: 0.5,
    },
    // action button dummy view  style
    socialProfileButton: {
      borderColor: "transparent",
      height: 30,
      borderRadius: 15,
      opacity: 1,
    },
    // not in used yet
    socialProfileAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: whiteColor,
      shadowColor: shadeColor(darkBlueColor, 0.12),
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 5,
      shadowOpacity: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    // input text label style. Used On: quiz form screen
    inputLabel:
      bodyText.family !== "Default"
        ? FontManager.createFontStyles(bodyText.family)
        : { fontFamily: fontFamilyMapping(bodyText.family) },
    // description title style used for course description screen
    courseDescriptionTitle: setFont({
      ...bodyText,
      size: 17,
      color: textColor,
      weight: FontWeights.semiBold,
    }),
    // course date text style. Used On: course screen
    courseDate: setFont({
      ...bodyText,
      size: 13,
      color: descLightTextColor,
      weight: FontWeights.medium,
    }),
    // course includes label text style. Used On: course screen
    courseIncludesTitle: {
      ...setFont({
        ...bodyText,
        size: 13,
        color: textColor,
        weight: FontWeights.bold,
      }),
      textTransform: "uppercase",
    },
    // course round view style. Used On: course material screen,course quiz sceen, course single screen, learn topic single screen, lesson single screen
    courseRoundBox: {
      marginBottom: 16,
      borderRadius: 10,
      backgroundColor: bodyFrontBg,
    },
    // not used
    courseRoundBoxStart: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      backgroundColor: bodyFrontBg,
      height: 10,
    },
    // not used
    courseRoundBoxEnd: {
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: bodyFrontBg,
      height: 10,
    },
    // course title style. Used On: course single screen, lesson single screen and learn topic single screen
    courseRoundBoxTitleAbove: {
      ...setFont({
        ...bodyText,
        size: 22,
        color: headingsColor,
        weight: FontWeights.semiBold,
      }),
      marginBottom: 9,
    },
    // not used
    courseRoundBoxTitle: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: descTextColor,
        weight: FontWeights.heavy,
      }),
      marginBottom: 8,
    },
    // course quiz text style. Used On: course screen
    courseRoundBoxSectionTitle: {
      ...setFont({
        ...bodyText,
        size: 17,
        color: descTextColor,
        weight: FontWeights.semiBold,
      }),
      marginBottom: 10,
    },
    // not used
    courseRoundP: {
      padding: 18,
    },
    // not used
    courseContentBoxItem: {
      paddingHorizontal: 18,
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 10,
      height: 60,
    },
    // progress list item and learn item parent view style
    courseRoundBoxItem: {
      paddingHorizontal: 18,
      height: 50,
      justifyContent: "center",
    },
    // title text style. Used On: progress list item and learn item
    courseRoundBoxItemText: setFont({
      ...bodyText,
      size: 17,
      color: textColor,
      weight: FontWeights.medium,
    }),
    // not used
    courseRoundBoxItemCount: setFont({
      ...bodyText,
      size: 17,
      color: descLightTextColor,
      weight: FontWeights.medium,
    }),
    // course section parent view style. Used On: course section screen
    courseRoundBoxSeparator: {
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    // course status tag text style. Used On: course widget
    courseStatusTagText: setFont({
      ...bodyText,
      size: 12,
      color: whiteColor,
      weight: FontWeights.semiBold,
    }),
    // course item view style. Used On: course widget
    courseItem: {
      overflow: "hidden",
    },
    // Course item content view. Used On: course widget horizontal list
    courseItemContent: {
      flex: 1,
      marginRight: 5,
    },
    // course item view style. Used On: course widget horizontal list
    courseItemWrap: {
      flex: 1,
      flexDirection: "row",
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 18,
    },
    // Error text style for IAP courses. Used On: IAP screen
    courseIapErrorText: setFont({
      ...bodyText,
      size: 15,
      color: descLightTextColor,
      weight: FontWeights.medium,
    }),
    // product price text style. Used On: store product dropdown view in IAP screen
    courseFooterPriceText: setFont({
      ...bodyText,
      size: 20,
      color: textColor,
      weight: FontWeights.semiBold,
    }),
    // not used
    bigTitle: {
      ...setFont({
        ...bodyText,
        size: 28,
        color: textColor,
        weight: FontWeights.bold,
      }),
      backgroundColor: "transparent",
    },
    // not used
    subtitle: {
      marginBottom: 10,
      ...setFont({
        ...bodyText,
        size: 14,
        color: highlightColor,
        weight: FontWeights.medium,
      }),
    },
    // not used
    lessonTitle: setFont({
      ...bodyText,
      size: 22,
      color: headingsColor,
      weight: FontWeights.semiBold,
    }),
    // complete lesson style. Used On: lesson single screen
    completeButton: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.semiBold,
    }),
    // Lesson complete button view style. Used On: lesson single screen
    completeLessonButtonW: {
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderRadius: 10,
    },
    // Topic complete button view style. Used On: learn topic single screen
    completeTopicButtonW: {
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderRadius: 10,
    },
    // Quiz complete button view style. Used On: quiz results screen
    quizResultButton: {
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderRadius: 10,
    },
    // Complete Lesson button text style. Used On: Lesson single screen
    completeLessonButton: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.bold,
    }),
    // Complete topic button style. Used On: learn topic single screen
    completeTopicButton: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.semiBold,
    }),
    // Complete quiz text style. Used On: quiz results screen
    quizResultButtonLabel: setFont({
      ...bodyText,
      size: 16,
      weight: FontWeights.semiBold,
    }),
    // Quiz category tag view style. Used On: quiz single Screen
    categoryTag: {
      backgroundColor: tagBackground,
      height: 27,
      borderRadius: 13,
      paddingHorizontal: 14,
      marginTop: 10,
      marginRight: 7,
      alignItems: "center",
      justifyContent: "center",
    },
    // certificates and quiz category tag text style. Used On: certificates screen and quiz single screen
    categoryTagInner: setFont({
      ...bodyText,
      size: 22,
      color: lightTextColor,
      weight: FontWeights.medium,
    }),
    // course category tag view style. Used On: single course screen, lesson single screen
    courseCategoryTag: {
      backgroundColor: secondaryButtonBg,
      height: 30,
      borderRadius: 16,
      paddingHorizontal: 14,
      marginTop: 10,
      marginRight: 6,
      alignItems: "center",
      justifyContent: "center",
    },
    // course category tag text style. Used On: single course screen, lesson single screen
    courseCategoryTagInner: setFont({
      ...bodyText,
      size: 14,
      color: secondaryButtonColor,
      weight: FontWeights.semiBold,
    }),
    // not used
    section: {
      marginBottom: 30,
    },
    // course menu item title text view wrapper style. Used On: course screen
    sectionTitleWrap: {
      justifyContent: "center",
      marginBottom: 15,
      marginLeft: 15,
    },
    // // course menu item title text style. Used On: course screen
    sectionTitle: {
      ...setFont({
        ...bodyText,
        size: 20,
        color: headingsColor,
        weight: FontWeights.semiBold,
      }),
      letterSpacing: 0.7,
      marginRight: 8,
    },
    // course menu view style. Used On: course screen
    sectionItem: {
      borderLeftColor: "transparent",
      borderLeftWidth: 2,
      paddingHorizontal: 15,
    },
    // course menu item view style. Used On: course screen
    sectionItemInner: {
      height: 48,
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    // course menu title text style. Used On: course screen
    sectionText: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: headingsColor,
        weight: FontWeights.medium,
      }),
      flex: 1,
      marginRight: 10,
    },
    // not used
    profileHeaderColor: {
      color: headingsColor,
      fontWeight: FontWeights.medium,
    },
    // Album widget header text style. Used On: album screen
    profileAlbumHeaderText: setFont({
      ...bodyText,
      size: 15,
      color: headingsColor,
      weight: FontWeights.medium,
    }),
    // Album widget text style. Used On: album screen
    profileAlbumText: setFont({
      ...bodyText,
      size: 13,
      color: descLightTextColor,
      weight: FontWeights.regular,
    }),
    // Profile header view style. Used On: Profile screen
    flexColumnCenter: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    // course item locked view style. Used On: course menu list screen
    locked: {
      opacity: 0.5,
    },
    // Section view to show course progess  and labels in course screen
    sectionItemDetails: {
      marginLeft: "auto",
    },
    // not in use
    lessonTopicCount: {
      marginRight: 11,
    },
    // Home page block title text style. Used On: home screen
    h5pTitle: {
      ...setFont({
        ...bodyText,
        size: 18,
        color: secondaryButtonColor,
        weight: FontWeights.semiBold,
      }),
      backgroundColor: "transparent",
    },
    // course progression normal text style. Used On: course screen
    progressText: {
      ...setFont({
        ...bodyText,
        size: 17,
        color: whiteColor,
        weight: FontWeights.heavy,
      }),
      lineHeight: Math.ceil(calcFontSize(12) * 1.42),
      backgroundColor: "transparent",
    },
    // course progression large text style. Used On: course screen
    progressLargeText: {
      ...setFont({
        ...bodyText,
        size: 18,
        color: textColor,
        weight: FontWeights.semiBold,
      }),
      backgroundColor: "transparent",
    },
    // check button text style for correct and incorrect answer and for quiz timer. Used On: Quiz screen
    quizCheckTitle: {
      ...setFont({
        ...bodyText,
        size: 18,
        color: headingsColor,
        weight: FontWeights.semiBold,
      }),
      backgroundColor: "transparent",
    },
    // not used
    quizQuestionStatus: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: descTextColor,
        weight: FontWeights.regular,
      }),
      backgroundColor: "transparent",
    },
    // not used
    quizCheckMessage: {
      ...setFont({
        ...bodyText,
        size: 18,
        color: descTextColor,
        weight: FontWeights.regular,
      }),
      backgroundColor: "transparent",
    },
    // Quiz overview & quiz next button style. Used On: Quiz screen
    checkDialogButton: setFont({
      ...bodyText,
      size: 15,
      color: textColor,
      weight: FontWeights.bold,
    }),
    // not used
    quizResultsTitle: {
      ...setFont({
        ...bodyText,
        size: 15,
        color: headingsColor,
        weight: FontWeights.regular,
      }),
      backgroundColor: "transparent",
    },
    // Question hint view style. Used On: Quiz screen
    quizDetailsButton: {
      ...setFont({
        ...bodyText,
        size: 15,
        color: textColor,
        weight: FontWeights.regular,
      }),
      backgroundColor: "transparent",
    },
    // Quiz start button style. Used On: Quiz screen
    quizStartButtonLabel: setFont({
      ...bodyText,
      size: 16,
      color: primaryButtonColor,
      weight: FontWeights.semiBold,
    }),
    // Quiz submit button style. Used On: Quiz screen
    quizSubmitButtonLabel: setFont({
      ...bodyText,
      size: 16,
      color: primaryButtonColor,
      weight: FontWeights.semiBold,
    }),
    quizTakeAgainButtonLabel: {},
    quizReviewButtonLabel: {},
    // Couuse Menu Side header bar text style. Course Screen
    sideMenuHeader: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: whiteColor,
        weight: FontWeights.regular,
      }),
      marginBottom: 30,
    },
    // Screen Scrolling header view style. Used On: Course Screen, Notification Screen, Profile Screen
    scrollHeaderContainer: {
      flex: 1,
      backgroundColor: bodyFrontBg,
      ...(Platform.OS === "android" ? { paddingTop: NAV_HEIGHT } : {}),
    },
    // Screen header style. Used On: many screens like CodeVerification Screen, Forget Screen, Link Account scrren, Social login screen, Lesson Single screen
    fakeHeader: {
      backgroundColor: headerBg,
      alignItems: "center",
      minHeight: HEADERHEIGHT + BARHEIGHT,
      paddingTop: BARHEIGHT,
    },
    // List Status bar style. Used On: List Screens
    fakeBar: {
      height: NAV_HEIGHT,
      backgroundColor: headerBg,
      position: "absolute",
      width: "100%",
      top: 0,
    },
    // header container style. Used On: CodeVerification Screen, Forget Screen, Link Account scrren, Social login screen
    fakeHeaderOffset: {
      marginTop: HEADERHEIGHT + BARHEIGHT,
    },
    //Header styling used in Forgot Password screen
    fakeHeaderForgotPassword: {
      marginTop: HEADERHEIGHT + BARHEIGHT,
    },
    //Header styling used in Code verification screen
    fakeHeaderCodeVerification: {
      marginTop: HEADERHEIGHT + BARHEIGHT,
    },
    // not used
    fakeBarOffset: {
      marginTop: BARHEIGHT,
    },
    // Not in Use yet
    fakeHeaderFix: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
    },
    // Countdown Timer text style. Used On: Lesson Single Screen, Quiz Single Screen & Topic Single Screen
    timer: {
      marginLeft: "auto",
      marginRight: 18,
      ...setFont({
        ...bodyText,
        size: 16,
        color: headingsColor,
        weight: FontWeights.regular,
      }),
    },
    // not used
    placeholder: {
      backgroundColor: whiteColor,
      opacity: 0.15,
      color: "transparent",
    },
    // not used
    placeholderDark: {
      backgroundColor: headingsColor,
      opacity: 0.1,
      color: "transparent",
    },
    // not used
    placeholderDarkTin: {
      backgroundColor: headingsColor,
      opacity: 0.1,
      color: "transparent",
      height: 9,
    },
    // Course description video place holder style. Used On: Course Screen
    place: {
      backgroundColor: shadeColor(whiteColor, 0.15),
    },
    // Content Place holder Style. Used On: many screens like Quiz screen, lesson screen, Course Screen, Sign up screen
    placeDarkTin: {
      backgroundColor: shadeColor(headingsColor, 0.05),
      height: 9,
    },
    // Place holder text style. Used On: Topic screen, Lesson Screen
    placeDark: {
      backgroundColor: shadeColor(headingsColor, 0.05),
    },
    // not used
    holderOneLine: {
      width: 100,
    },
    // not used
    pointTitle: setFont({
      ...bodyText,
      size: 16,
      color: headingsColor,
      weight: FontWeights.medium,
    }),
    // Result title text style. Used On: Result screen
    resultTitle: setFont({
      ...bodyText,
      size: 17,
      color: headingsColor,
      weight: FontWeights.medium,
    }),
    // not used
    footerButtonFixed: {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      backgroundColor: whiteColor,
    },
    // Quiz result screen sub title text style. Used On: Quiz Result screen
    resultsSubTitle: {
      ...setFont({
        ...bodyText,
        size: 22,
        color: headingsColor,
        weight: FontWeights.bold,
      }),
      marginBottom: 20,
    },
    // Quiz result screen row header text style. Used On: Quiz Result screen
    tableHeaderCell: setFont({
      ...bodyText,
      size: 11,
      color: descLightTextColor,
      weight: FontWeights.regular,
    }),
    // Quiz result row item text style. Used On: Quiz Result screen
    tableCell: setFont({
      ...bodyText,
      size: 13,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // Quiz Screen save result text style. Used On: Quiz Result screen
    saveButton: setFont({
      ...bodyText,
      size: 13,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // Activity screen Post Date Style. Used On: Activity screen
    activityDate: setFont({
      ...bodyText,
      size: 14,
      color: textColor,
      weight: FontWeights.regular,
    }),
    scheduleActivityDate: setFont({
      ...bodyText,
      size: 15,
      color: textIconColor,
      weight: FontWeights.medium,
    }),
    // Activity screen Comment Date Style. Used On: Activity screen
    activityDateComment: setFont({
      ...bodyText,
      size: 12,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // Activity screen and Blog screen Comment count & Like count Style. Used On: Activity Screen & Blog screen
    activityCount: {
      ...setFont({
        ...bodyText,
        size: 13,
        color: textColor,
        weight: FontWeights.medium,
      }),
      marginTop: Platform.select({ ios: 1, android: -2, default: 1 }),
    },
    activityButtonLabel: {
      ...setFont({
        ...bodyText,
        size: 13,
        color: textColor,
        weight: FontWeights.medium,
      }),
      marginTop: Platform.select({ ios: 1, android: -2, default: 1 }),
    },
    activityButtonLabel: {
      ...setFont({
        ...bodyText,
        size: 13,
        color: textColor,
        weight: FontWeights.medium,
      }),
      marginTop: Platform.select({ ios: 1, android: -2, default: 1 }),
    },
    // Profile activity's header User Full name Style. Used On: profile Activities screen
    activityUsername: setFont({
      ...bodyText,
      size: 14,
      color: headingsColor,
      weight: FontWeights.regular,
    }),
    // Profile activity's header User nickname Style. Used On: profile Activities screen
    activityNicename: setFont({
      ...bodyText,
      size: 10,
      color: descLightTextColor,
      weight: FontWeights.regular,
    }),
    // not used
    h1: setHeadingFont({
      color: headingsColor,
      size: BASE_HEADING_SIZE,
      weight: FontWeights.semiBold,
      headingTag: "h1",
    }),
    // not used
    h2: setHeadingFont({
      color: headingsColor,
      size: BASE_HEADING_SIZE,
      weight: FontWeights.semiBold,
      headingTag: "h2",
    }),
    // not used
    h3: setHeadingFont({
      color: headingsColor,
      size: BASE_HEADING_SIZE,
      weight: FontWeights.semiBold,
      headingTag: "h3",
    }),
    // not used
    h4: setHeadingFont({
      color: headingsColor,
      size: BASE_HEADING_SIZE,
      weight: FontWeights.semiBold,
      headingTag: "h4",
    }),
    // not used
    h5: setHeadingFont({
      color: headingsColor,
      size: BASE_HEADING_SIZE,
      weight: FontWeights.semiBold,
      headingTag: "h5",
    }),
    // not used
    h6: setHeadingFont({
      color: headingsColor,
      size: BASE_HEADING_SIZE,
      weight: FontWeights.semiBold,
      headingTag: "h6",
    }),
    contentText:
      bodyText.family !== "Default"
        ? FontManager.createFontStyles(bodyText.family)
        : {
            fontFamily: fontFamilyMapping(bodyText.family),
          },
    blockListItemContainer: {
      overflow: "hidden",
    },
    // Home Screen visible block List item container style. Used On: Home screen
    blockListItemVisibleContainer: {
      overflow: "visible",
      marginTop: -1,
    },
    // not used
    blockScreenBlockWrap: {
      marginVertical: 0,
    },
    // Activity screen header style. Used On: Activity screen
    actionSheetHeader: {
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      alignItems: "center",
      paddingLeft: 20,
      paddingRight: 14,
      paddingBottom: 20,
      marginBottom: 6,
    },
    // Action Sheet internal content style. Used On: Group screen, Social group screen & Forum Single screen
    actionSheetContent: {
      ...setFont({
        ...bodyText,
        size: 17,
        color: descTextColor,
        weight: FontWeights.regular,
      }),
      marginTop: 7,
      backgroundColor: "transparent",
    },
    // action sheet Header content text style. Used On: header section which in turn Used On: many screens.
    actionSheetHeaderContent: {
      marginTop: 3,
    },
    // action sheet Header title text style. Used On: header section which in turn Used On: many screens.
    actionSheetHeaderTitle: setFont({
      size: 16,
      family: bodyText.family,
      weight: FontWeights.semiBold,
      color: textColor,
    }),
    // Action Sheet internal content style. Used On: Group screen, Social group screen & Forum Single screen
    actionSheetContent: setFont({
      size: 17,
      family: bodyText.family,
      weight: FontWeights.regular,
      color: descTextColor,
    }),
    // Message Screen Sender name text. Used On: Message Screen
    messageExcerpt: {
      ...setFont({
        ...bodyText,
        size: calcFontSize(15),
        color: descTextColor,
        weight: FontWeights.regular,
      }),
      lineHeight: calcFontSize(20),
      backgroundColor: "transparent",
    },
    // Message send to recipeint user in a group text style. Used On: Group message Create Screen
    toUserLabel: {
      ...setFont({
        ...bodyText,
        size: 15,
        color: descTextColor,
        weight: FontWeights.regular,
      }),
      backgroundColor: "transparent",
    },
    // Bolded text style on search for users dropdown. Used On: Group message Create Screen
    toUserInput: {
      ...setFont({
        ...bodyText,
        size: 15,
        color: textColor,
        weight: FontWeights.medium,
      }),
      backgroundColor: "transparent",
    },
    // not used
    accountSettingsModalTitle: setFont({
      ...bodyText,
      size: 19,
      color: headingsColor,
      weight: FontWeights.medium,
    }),
    // Export Data modal descriptional text style. Used On: Export data screen
    accountSettingsModalInfoText: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: descTextColor,
        weight: FontWeights.medium,
      }),
      lineHeight: Math.ceil(calcFontSize(15) * 1.2),
      textAlign: "center",
    },
    //  Activity indicator style. Used On: Group Inviite Screen, Privacy setting screen & Login info Screen
    settingsFormContainer: {
      flexGrow: 1,
      paddingTop: 20,
      paddingHorizontal: GUTTER,
      backgroundColor: bodyFrontBg,
    },
    // Activity indicator style. Used On: Group Inviite Screen, Privacy setting screen & Login info Screen
    settingsFormLoader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 20,
    },
    // not used
    settingsFormErrorText: {
      textAlign: "center",
      margin: GUTTER,
    },
    // Group invite and Privacy setting Message View style
    settingsFormInfoContainer: {
      paddingBottom: 20,
    },
    // Setting List container style. Used On: setting screen
    tabLinksContainer: {
      backgroundColor: whiteColor,
      borderRadius: 10,
      overflow: "hidden",
      marginHorizontal: GUTTER,
    },
    // not used
    tabBarText: {
      ...setFont({
        ...bodyText,
        size: 10,
        color: linkColor,
        weight: FontWeights.medium,
      }),
      opacity: 1,
      textAlign: "center",
    },
    // Read more text style generally used in app and also used for photo description screen. Used On: Photo description screen and various screens in app
    readMore: {
      ...setFont({
        ...bodyText,
        size: 13,
        color: linkColor,
        weight: FontWeights.semiBold,
      }),
      width: 100,
    },
    // Blocked user name text style. Used On: block user screen
    boxTitle: setFont({
      ...bodyText,
      size: 17,
      color: textColor,
      weight: FontWeights.semiBold,
    }),
    // Modal title. Used on: Change Video Thumbnail screen
    changeVideoThumbTitle: setFont({
      ...bodyText,
      size: 18,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // Upload area text. Used on: Change Video Thumbnail screen
    uploadImageText: setFont({
      ...bodyText,
      size: 17,
      color: descLightTextColor,
      weight: FontWeights.regular,
    }),
    // Radio button title. Used on: Change Video Thumbnail screen
    radioBoxTitle: setFont({
      ...bodyText,
      size: 17,
      color: textColor,
      weight: FontWeights.regular,
    }),
    radioBoxDesc: setFont({
      ...bodyText,
      size: 14,
      color: descLightTextColor,
      weight: FontWeights.regular,
    }),
    // not used
    boxDesc: setFont({
      ...bodyText,
      size: 16,
      color: descLightTextColor,
      weight: FontWeights.regular,
    }),
    // Topic title Text Style. Used On: Topic single screen
    topicSingleTitle: setFont({
      ...bodyText,
      size: 22,
      color: textColor,
      weight: FontWeights.bold,
    }),
    // Topic Screen Media Style. Used On: Topic single screen
    topicMediaItem: {
      width: 50,
      height: 54,
      borderRadius: 8,
      marginRight: 8,
      resizeMode: "cover",
    },
    // Forum's topic tag view style. Used On: Forum Topic Screen
    topicTag: {
      backgroundColor: secondaryButtonBg,
      borderRadius: 12,
      paddingVertical: 4,
      paddingHorizontal: 10,
    },
    // Forum's topic tag text style. Used On: Forum Topic Screen
    topicTagText: setFont({
      ...bodyText,
      size: 13,
      color: secondaryButtonColor,
      weight: FontWeights.medium,
    }),
    // Group name Title style. Used On: Manage Group Screen
    groupSelect: setFont({
      ...bodyText,
      size: 17,
      color: textColor,
      weight: FontWeights.semiBold,
    }),
    // Group name and group description text style Used On: Manage Group Screen
    // Setting  Form Item Component Text Style used in heading and select box. Used On: Setting Screen
    groupManageSectionTitle: {
      ...setFont({
        ...bodyText,
        size: 22,
        color: headingsColor,
        weight: FontWeights.bold,
      }),
      letterSpacing: 0.25,
      marginBottom: 5,
    },
    // Group cover photo text style. Used On: Manage Group screen
    groupManageSectionSubtitle: setFont({
      ...bodyText,
      size: 18,
      color: textColor,
      weight: FontWeights.semiBold,
    }),
    // Advanced Search label text style. Used On: Advance search screen
    advancedSearchLabel: {
      textTransform: "uppercase",
      ...setFont({
        ...bodyText,
        size: 14,
        weight: FontWeights.semiBold,
      }),
    },
    // Products description style. Used On: IAP Screen
    productDescription: setFont({
      ...bodyText,
      size: 17,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // Product Title Text Style. Used On: Registration Products screen
    iapSelectProductTitle: {
      ...setFont({
        ...bodyText,
        size: 18,
        color: textColor,
        weight: FontWeights.bold,
      }),
      textAlign: "center",
    },
    // Product Price description and Paid Status Text style. Used On: IAP Screen
    iapLabelText: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: "#fff",
        weight: FontWeights.regular,
      }),
      textAlign: "center",
      textAlignVertical: "center",
    },
    // Product Title Text Style. Used On: IAP screen
    iapProductTitle: {
      ...setFont({
        ...bodyText,
        size: 26,
        color: textColor,
        weight: FontWeights.bold,
      }),
      textAlign: "center",
    },
    // Product Price Text Style. Used On: IAP screen
    iapProductPrice: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: secondaryButtonColor,
        weight: FontWeights.bold,
      }),
      textAlign: "center",
    },
    iapCollapsableProductPrice: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: secondaryButtonColor,
        weight: FontWeights.bold,
      }),
      textAlign: "center",
    },
    // Product Duration Text Style. Used On: IAP screen
    iapProductPriceDescription: {
      ...setFont({
        ...bodyText,
        size: 15,
        color: descTextColor,
        weight: FontWeights.regular,
      }),
      textAlign: "center",
    },
    iapCollapsableProductPriceDescription: {
      ...setFont({
        ...bodyText,
        size: 10,
        color: descTextColor,
        weight: FontWeights.regular,
      }),
      textAlign: "center",
    },
    // Product Missing Duration Text Style. Used On: IAP screen
    iapProductMissingPriceDescription: setFont({
      ...bodyText,
      size: 10,
      color: descTextColor,
      weight: FontWeights.regular,
    }),
    // Product Purchased Text Style. Used On: IAP screen
    iapPurchasedLabel: setFont({
      ...bodyText,
      size: 20,
      color: textColor,
      weight: FontWeights.regular,
    }),
    // Document & Photos Folder Move to destination folder text style. Used On: Document Screen & Photos Screen.
    moveToText: setFont({
      ...bodyText,
      size: 15,
      color: textColor,
      weight: FontWeights.regular,
    }),
    //  Group & Photo Document title Style. Used On: Group Screen & Photos Screen
    folderTitle: setFont({
      ...bodyText,
      size: 22,
      color: headingsColor,
      weight: FontWeights.semiBold,
    }),
    // Document screen Filename Text Style. Used On: Document Screen
    documentTitle: setFont({
      ...bodyText,
      color: headingsColor,
      size: 17,
      weight: FontWeights.semiBold,
    }),
    // Document screen list item text style. Used On: Document screen
    documentMeta: setFont({
      ...bodyText,
      size: 13,
      color: descLightTextColor,
      weight: FontWeights.regular,
    }),
    // Profile Cover photo text heading style. Used On: Cover
    assignmentHeading: setFont({
      size: 25,
      weight: FontWeights.bold,
      family: bodyText.family,
      color: headingsColor,
    }),
    // Lesson or Topic Screen Assignments heading text style
    assignmentDesc: {
      ...setFont({
        size: 13,
        weight: FontWeights.regular,
        family: bodyText.family,
        color: descLightTextColor,
      }),
      textAlign: "center",
    },
    // Lesson or Topic Screen Assignment List item text style
    assignmentTitle: setFont({
      ...bodyText,
      color: headingsColor,
      size: 17,
      weight: FontWeights.semiBold,
    }),
    // Lesson or Topic Screen Assignment List item heading style
    videoUploadProgressText: setFont({
      ...bodyText,
      size: 11,
      color: whiteColor,
      weight: FontWeights.regular,
    }),
    // Used for playing videos using AppWebView such as vimeo and youtube videos
    webVideoPlayer: {
      borderRadius: 0,
    },
    //Used to add style to the video container of downloaded assets
    localVideoContainer: {
      borderRadius: 0,
    },
    //Used to add style to the video component of downloaded assets
    localVideoPlayer: {
      borderRadius: 0,
    },
    //Used for styling the View component when displaying an offline video message
    offlineVideoContainer: {
      borderRadius: 0,
    },
    //Used for styling lesson button container. Used in lesson single screen
    lessonActionButtonContainer: {
      zIndex: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    //Used for styling the complete icon. Used in lesson single screen
    lessonActionCompleteIcon: {
      width: 36,
      height: 36,
    },
    //Used for styling the activity indicator of action button in lesson single screen
    lessonButtonLoadingIcon: {},
    //Used for styling learn topic button container
    learnTopicActionButtonContainer: {
      zIndex: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    //Used for styling the complete icon. Used in learn topic single screen
    learnTopicActionCompleteIcon: {
      width: 36,
      height: 36,
    },
    //Used for styling the activity indicator of action button in learn topic single screen
    learnTopicButtonLoadingContainer: {},
    //Used for styling action button container. Used in quiz results screen
    quizResultButtonContainer: {
      zIndex: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderTopWidth: StyleSheet.hairlineWidth,
      marginBottom: 10,
    },
    //Used for styling quiz start button container
    quizStartButtonContainer: {
      paddingTop: 16,
      paddingHorizontal: 20,
      backgroundColor: bodyFrontBg,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: "#C6C6C8",
    },
    //Used for styling quiz start button
    quizStartButton: {
      height: 40,
    },
    //Used for styling the activity indicator of start button in quiz single screen
    quizStartButtonLoading: {},
    //Used for styling quiz submit button in quiz single screen
    quizSubmitButton: {
      flex: 1,
    },
    //Used for styling quiz submit button container in quiz single screen
    quizSubmitButtonContainer: {
      flexDirection: "row",
      backgroundColor: bodyFrontBg,
    },
    //Used for styling the activity indicator of submit button in quiz single screen
    quizSubmitButtonLoading: {},
    //Contains the video player. Used on: Screens where the video block is used
    videoBlockContainer: {
      flex: 1,
    },
    //Contains the block components. Used on: LessonSingleScreen
    lessonSingleScreenBlockContainer: {
      paddingTop: 5,
      paddingHorizontal: 5,
    },
    //Contains the block components. Used on: LearnTopicSingleScreen
    learnTopicSingleScreenBlockContainer: {
      paddingTop: 5,
      paddingHorizontal: 5,
    },
    //Contains the block components. Used on: QuizSingleScreen
    quizSingleScreenBlockContainer: {
      paddingHorizontal: 5,
    },
    // progress text showing upload percentage for videos. Used On: New Activity, Comment, Topic, Reply Create screen during video upload
    bottomSheetSeparator: {
      height: StyleSheet.hairlineWidth,
      marginLeft: GUTTER,
      backgroundColor: borderColor,
    },
    // Add photos to album option modal separator between header and body of modal style
    topButton: {
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
    },
    // Add photos to album option top button style
    bottomButton: {
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
    },
    // Add photos to album option bottom button style
    bottomSheetButton: {
      paddingVertical: 20,
      paddingLeft: GUTTER,
      alignItems: "center",
    },
    // Add photos to album option common button style
    bottomSheetButtonText: {
      fontSize: 17,
      marginLeft: 12,
      fontWeight: FontWeights.medium,
      color: textColor,
    },
    // Add photos to conversation title style
    archiveHeadingText: {
      fontSize: 15,
      fontWeight: FontWeights.medium,
      color: textColor,
    },
    // Add photos to conversation icon style
    archiveHeadingIcon: {
      width: 20,
      height: 20,
      marginLeft: GUTTER + 20,
    },
    // Notification subscription item title style
    subscriptionHeadingText: {
      fontSize: 15,
      fontWeight: FontWeights.medium,
      color: textColor,
    },
    bottomSheetButtonText: {
      fontSize: 17,
      marginLeft: 12,
      fontWeight: FontWeights.medium,
      color: textColor,
    },
    messageActionButton: {
      fontSize: 10,
      fontWeight: FontWeights.medium,
      color: textIconColor,
    },
    messageErrorMessage: {
      fontSize: 10,
      fontWeight: FontWeights.medium,
      color: warningColor,
      marginHorizontal: 5,
    },
    messageErrorIcon: {
      height: 10,
      width: 10,
    },
    messageSpinnerIcon: {
      height: 10,
      width: 10,
      marginRight: 5,
    },
    messageActionButtonSeparator: {
      backgroundColor: borderColor,
      width: 1.5,
      height: 11,
      marginHorizontal: 5,
      opacity: 0.5,
    },
    restrictionMessage: {
      ...setFont({
        ...bodyText,
        size: calcFontSize(16),
        color: descTextColor,
        weight: FontWeights.medium,
      }),
      textAlign: "center",
    },
    restrictionAction: {
      ...setFont({
        ...bodyText,
        size: calcFontSize(16),
        color: primaryColor,
        weight: FontWeights.bold,
      }),
      textAlign: "center",
    },
    restrictionActionIcon: {
      color: descTextColor,
      height: 10.5,
      width: 15,
      paddingHorizontal: 15,
    },
    groupIconThreadItem: {
      width: 21,
      height: 21,
      color: descLightTextColor,
      marginRight: 5,
    },
    //Giphy error
    errorGiphy: setFont({
      ...bodyText,
      size: 13,
      color: textIconColor,
      weight: FontWeights.regular,
    }),
    // blog list item title style
    blogItemTitle: setFont({
      ...bodyText,
      size: 15,
      weight: FontWeights.semiBold,
      color: textColor,
    }),
    // blog list item image style
    blogItemImageStyle: {
      height: 100,
      width: 100,
      borderRadius: 14,
      overflow: "hidden",
      borderColor: "rgba(0,0,0,0.08)",
      borderWidth: 1,
    },
    // blog list item author title style
    blogItemAuthorText: {
      ...setFont({
        ...bodyText,
        size: 13,
        weight: FontWeights.regular,
        color: textColor,
      }),
      backgroundColor: "transparent",
      marginTop: 8,
    },
    // invite using link label style
    inviteLinkLabel: {
      ...setFont({
        ...bodyText,
        size: 18,
        weight: FontWeights.bold,
        color: linkColor,
      }),
    },
    // used in schedule post modal
    schedulePostDateGuideline: {
      ...setFont({
        ...bodyText,
        size: 15,
        weight: FontWeights.regular,
        color: textColor,
      }),
    },
    //Used in ActivityContentComment
    commentDetailsContainer: { marginLeft: 10, flex: 1 },
    //Reaction Hint Text Style
    reactionHintText: {
      ...setFont({
        ...bodyText,
        size: 15,
        weight: FontWeights.medium,
        color: descTextColor,
      }),
      textAlign: "center",
    },
  };
  const globalStyles = configureGlobalStyle(externalCodeSetup)(
    globalStylesDefault,
    styles.colors
  );
  const htmlStyles = StyleSheet.create({
    strong: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: textColor,
        weight: FontWeights.heavy,
      }),
      lineHeight: Math.ceil(calcFontSize(14) * 1.31),
    },
    b: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: textColor,
        weight: FontWeights.heavy,
      }),
      lineHeight: Math.ceil(calcFontSize(14) * 1.31),
    },
    i: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: lightTextColor,
        weight: FontWeights.regular,
      }),
      lineHeight: Math.ceil(calcFontSize(14) * 1.31),
    },
    a: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: linkColor,
        weight: FontWeights.regular,
      }),
      lineHeight: Math.ceil(calcFontSize(14) * 1.31),
    },
    p: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: lightTextColor,
        weight: FontWeights.regular,
      }),
      lineHeight: Math.ceil(calcFontSize(14) * 1.31),
    },
    h1: {
      ...setHeadingFont({
        color: headingsColor,
        size: BASE_HEADING_SIZE,
        weight: FontWeights.heavy,
        headingTag: "h1",
      }),
      marginBottom: 23,
    },
    h2: {
      ...setHeadingFont({
        color: headingsColor,
        size: BASE_HEADING_SIZE,
        weight: FontWeights.bold,
        headingTag: "h2",
      }),
      marginBottom: 23,
    },
    h3: {
      ...setHeadingFont({
        color: headingsColor,
        size: BASE_HEADING_SIZE,
        weight: FontWeights.semiBold,
        headingTag: "h3",
      }),
      marginBottom: 22,
    },
    h4: {
      ...setHeadingFont({
        color: headingsColor,
        size: BASE_HEADING_SIZE,
        weight: FontWeights.medium,
        headingTag: "h4",
      }),
      marginBottom: 22,
    },
    h5: {
      ...setHeadingFont({
        color: headingsColor,
        size: BASE_HEADING_SIZE,
        weight: FontWeights.regular,
        headingTag: "h5",
      }),
      marginBottom: 23,
    },
    h6: {
      ...setHeadingFont({
        color: headingsColor,
        size: BASE_HEADING_SIZE,
        weight: FontWeights.light,
        headingTag: "h6",
      }),
      marginBottom: 23,
    },
    ul: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: shadeColor(textColor, 0.5),
        weight: FontWeights.regular,
      }),
      lineHeight: Math.ceil(calcFontSize(16) * 1.31),
      marginBottom: 20,
    },
    ol: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: shadeColor(textColor, 0.5),
        weight: FontWeights.regular,
      }),
      lineHeight: Math.ceil(calcFontSize(14) * 1.31),
      marginBottom: 20,
    },
    li: {
      ...setFont({
        ...bodyText,
        size: 14,
        color: textColor,
        weight: FontWeights.regular,
      }),
      lineHeight: Math.ceil(calcFontSize(14) * 1.31),
    },
    pre: {
      ...setFont({
        ...bodyText,
        size: 16,
        color: textColor,
        weight: FontWeights.regular,
      }),
      marginBottom: 20,
    },
  });
  const htmlAdjustedCss =
    `\n
        body {
            font-size: ` +
    calcFontSize(16) +
    `px;
			line-height: 1.44;
        }`;
  const htmlContentCss = `\n
        body, p {
			font-size: ${calcFontSize(16)}px;
			color: ${textColor};
			line-height: 1.47;
		}
		`;
  const htmlCourseMaterials =
    `\n
        a {
      		text-decoration: none;
      		font-size: ` +
    calcFontSize(15) +
    `px;
      		display: block;
        	border-bottom-color: ` +
    borderColor +
    `;
        	border-bottom-style: solid;
			border-bottom-width: ` +
    StyleSheet.hairlineWidth +
    `px;
			padding: 14px 32px 14px 0;
		}
		body {
			margin-bottom: -4px;
		}
		iframe {
			display: none !important;
		}
		`;
  const tagsStyles = {
    p: {
      color: textColor,
      marginBottom: 8,
    },
    a: {
      color: linkColor,
      textDecorationLine: "none",
    },
    blockquote: {
      whiteSpace: "pre-wrap",
      borderLeftWidth: 3,
      borderColor: borderColor,
      margin: 5,
      paddingTop: 5,
      paddingLeft: 8,
    },
  };
  const baseFontStyle = (size) =>
    setFont({
      ...bodyText,
      size: size === "regular" ? 16 : size,
      weight: FontWeights.regular,
      color: textColor,
    });
  const classesStyles = {
    alignright: {
      alignSelf: "flex-end",
    },
    alignleft: {
      alignSelf: "flex-start",
    },
    aligncenter: {
      alignSelf: "center",
    },
  };
  const htmlActivityStylesCss = `
		body {
			color: ${textColor};
		}
		p, table {
            color: ${textColor};
        }
	`;
  const htmlStylesCss =
    normalize +
    `\n
		${generateAssetsFontCss(bodyText.family)}
		\n
        body {
            font-size: ` +
    calcFontSize(16) +
    `px;
            /*line-height: ` +
    Math.ceil(calcFontSize(14) * 1.31) +
    `px;*/
            color: ` +
    textColor +
    `;overflow: hidden;
            background-color: ` +
    bodyFrontBg +
    `;
        }
        p, table {
            color: ` +
    descTextColor +
    `;
            margin: 0 0 12px;
        }
        p br {
            line-height: 20px;
        }
        .wp-video {
       		max-width: 100%;
        	height: auto;
		}
		figure {
			vertical-align: bottom;
			margin: 0;
			margin-bottom: 12px;
		}
        img {
            max-width: 100%;
            width: auto !important;
            height: auto !important;
            vertical-align: bottom;
            margin-bottom: 12px;
        }
        img.alignright {
            margin: 12px 0 12px 24px;
        }
        img.alignleft {
            margin: 12px 24px 12px 0;
        }
        img.aligncenter {
            margin-top: 12px;
            margin-bottom: 12px;
        }
        .alignright {
            float: right;
        }
        .alignleft {
            float: left;
        }
        .aligncenter {
        		display: block;
            margin-left: auto;
            margin-right: auto;
        }
        .wp-caption-text {
            font-size: ` +
    calcFontSize(12) +
    `px;
            color: ` +
    descTextColor +
    `;
            margin: 0;
        }
        .wp-caption {
            margin-bottom: 1.14em;
            max-width: 100%;
        }
        .wp-caption img {
            margin-bottom: 0;
        }
        strong {
            font-weight: "800";
            color: ${textColor}
        }
        b {
            font-weight: "800";
            color: ${textColor}
        }
        i {
            color: ` +
    textColor +
    ` ;
        }
        a {
            color: ` +
    linkColor +
    `;
        }
        pre {
            margin-bottom: 12px;
            font-size: ` +
    calcFontSize(12) +
    `px;
			max-width: 100%;
			white-space: pre-wrap;       /* css-3 */
			white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
			white-space: -pre-wrap;      /* Opera 4-6 */
			white-space: -o-pre-wrap;    /* Opera 7 */
			word-wrap: break-word;       /* Internet Explorer 5.5+ */
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 0;
        }
        h1 {
			font-size: ` +
    calcHeadingFontSize("h1") +
    `px;
            color: ` +
    textColor +
    `;
            margin-bottom: 23px;
        }
        h2 {
            font-size: ` +
    calcHeadingFontSize("h2") +
    `px;
            color: ` +
    textColor +
    `;
            margin-bottom: 23px;
        }
        h3 {
            font-size: ` +
    calcHeadingFontSize("h3") +
    `px;
            color: ` +
    textColor +
    `;
            margin-bottom: 22px;
        }
        h4 {
            font-size: ` +
    calcHeadingFontSize("h4") +
    `px;
            color: ` +
    textColor +
    `;
            margin-bottom: 22px;
        }
        h5 {
            font-size: ` +
    calcHeadingFontSize("h5") +
    `px;
            color: ` +
    textColor +
    `;
            margin-bottom: 23px;
        }
        h6 {
            font-size: ` +
    calcHeadingFontSize("h6") +
    `px;
            color: ` +
    textColor +
    `;
            margin-bottom: 23px;
        }
        ol, ul {
            margin-bottom: 20px;
            margin-left: 20px;
        }
        li {
            color: ` +
    textColor +
    `;
        }
        iframe.wp-embedded-content {
            display: none;
        }
        blockquote.wp-embedded-content {
            padding: 0;
            margin: 0;
        }
        blockquote:not(.wp-embedded-content) {
            position: relative;
            margin-left: 0;
            padding-left: 30px;
        }
        blockquote:not(.wp-embedded-content):before {
            content: "“";
            font-size: 60px;
            color: ` +
    borderColor +
    `;
            position: absolute;
            top: 20px;
            left: 0;
        }
        blockquote p {
           margin-bottom: 0;
        }
        cite {
            text-style: normal;
        }
        cite a {
           color: ` +
    descLightTextColor +
    `;
           text-decoration: none;
           text-style: normal;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
        th, td {
            text-align: left;
            padding-left: 10px;
            padding-right: 10px;
            border-bottom: 1px solid ` +
    borderColor +
    `;
        }
        th {
            padding-top: 10px;
            padding-bottom: 9px;
            background-color: ` +
    bodyBg +
    `;
            color: ` +
    descLightTextColor +
    `;
        }
        td {
            padding-top: 15px;
            padding-bottom: 15px;
        }
        input[type="text"] {
          -webkit-appearance: none;
    			-moz-appearance: none;
    			appearance: none;
    			font-size: ` +
    calcFontSize(16) +
    `px;
        	box-sizing: border-box;
        	padding-left: 10px;
        	padding-right: 10px;
        	height: 36px;
        	border-radius: 3px;
        	border: 1px solid ` +
    borderColor +
    `;
        	-webkit-box-shadow: none;
					-moz-box-shadow: none;
					box-shadow: none;
					outline: none;
        }
				.learner-app-show {
					display: block !important;
				}
				.learner-app-hide {
					display: none !important;
				}
				.app-quiz-shortcode {
					font-family: "Sofia";
				}
				.app-quiz-shortcode h3 {
					font-size: 13px;
					text-transform: uppercase;
					height: 48px;
					background-color: ` +
    bodyBg +
    `;
					color: ` +
    headingsColor +
    `;
					letter-spacing: 0.7px;
					padding-left: 16px;
					padding-top: 14px;
					padding-bottom: 14px;
					box-sizing: border-box;
					margin-bottom: 0;
				}
				.app-quiz-shortcode a {
					border-bottom: 1px solid ` +
    borderColor +
    `;
					height: 48px;
					padding-left: 14px;
					font-size: 15px;
					text-decoration: none;
					color: ` +
    headingsColor +
    `;
					padding-top: 14px;
					padding-bottom: 14px;
					box-sizing: border-box;
					display: block;
				}
    `;
  const formStyles = StyleSheet.create({
    selectField: {
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      marginRight: 10,
    },
    selectIcon: {
      marginRight: 15,
      width: 17,
      height: 17,
    },
    forumIcon: {
      marginRight: 15,
      width: 17,
      height: 16,
    },
    spreadInput: {
      marginBottom: 0,
      borderBottomWidth: 0,
    },
    formInputWrap: {
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    noPadding: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    fieldsGroup: {
      flexShrink: 1,
      flexGrow: 0,
      backgroundColor: shadeColor("#EDEEF2", 0.32),
      paddingLeft: 16,
      paddingRight: 16,
    },
    tagsContainer: {
      minHeight: 24,
      backgroundColor: secondaryButtonBg,
      paddingHorizontal: 8,
      borderRadius: 20,
    },
    tags: {
      width: 16,
      height: 16,
      marginRight: 10,
    },
    input: {
      flexDirection: "row",
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      alignItems: "center",
      height: 45,
    },
    border: {
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    tagsInput: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingTop: 3,
      paddingBottom: 0,
      height: "auto",
    },
    checkInput: {
      justifyContent: "space-between",
      borderBottomWidth: 0,
      height: 60,
    },
    icon: { tintColor: textIconColor },
    iconButton: {
      width: 22,
      height: 22,
      marginRight: 10,
    },
    preview: {
      width: 30,
      height: 30,
      marginLeft: 15,
      alignItems: "center",
      justifyContent: "center",
      resizeMode: "contain",
    },
    checkLabel: setFont({
      ...bodyText,
      size: 15,
      color: lightTextColor,
      weight: FontWeights.regular,
    }),
    footerButton: {
      height: 47,
      backgroundColor: secondaryButtonBg,
    },
    footerButtonFixed: {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
    },
    buttonText: setFont({
      ...bodyText,
      size: 16,
      color: secondaryButtonColor,
      weight: FontWeights.regular,
    }),
    pickerLabel: {
      ...setFont({
        ...bodyText,
        size: 17,
        color: descLightTextColor,
        weight: FontWeights.regular,
      }),
      marginRight: 10,
    },
    picker: setFont({
      ...bodyText,
      size: 15,
      color: linkColor,
      weight: FontWeights.regular,
    }),
    selectorLabel: {
      ...setFont({
        ...bodyText,
        size: 13,
        color: descLightTextColor,
        weight: FontWeights.regular,
      }),
      marginBottom: 8,
    },
    advancedSelector: {
      paddingTop: 18,
      paddingBottom: 20,
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    mergeWarning: setFont({
      ...bodyText,
      size: 13,
      color: descLightTextColor,
      weight: FontWeights.regular,
    }),
    mergeWarningIcon: {
      width: 15,
      height: 15,
      marginRight: 6,
    },
  });
  const cssApiHooks = getExternalCodeSetup().cssApi;
  return {
    calcFontSize,
    global: globalStyles,
    htmlStyles,
    htmlStylesCss,
    tagsStyles,
    htmlActivityStylesCss,
    baseFontStyle,
    htmlAdjustedCss,
    htmlContentCss: cssApiHooks.filterContentCss(htmlContentCss, typography),
    htmlCourseMaterials,
    formStyles,
    typography,
    colors: {
      ...styles.colors,
      ...localColors,
      ...derivedColors,
      ...customColors,
      ...indicatorColors,
      authInputColors,
    },
  };
};
export const globalStyle = memoize((styles) => buildGlobalStyles(styles), {
  max: 1,
});
