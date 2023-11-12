export function getImagePath(imageName: string | number) {
  return {
    "assets/images/profiles/1_M_30_Alex.webp": require("../assets/images/profiles/1_M_30_Alex.webp"),
    "assets/images/profiles/4_M_33_Sam.webp": require("../assets/images/profiles/4_M_33_Sam.webp"),
    "assets/images/profiles/7_F_32_Katie.webp": require("../assets/images/profiles/7_F_32_Katie.webp"),
    "assets/images/profiles/9_F_25_Emily.webp": require("../assets/images/profiles/9_F_25_Emily.webp"),
    "assets/images/profiles/12_N_26_Ivy_1.webp": require("../assets/images/profiles/12_N_26_Ivy_1.webp"),
    // Add similar lines for other images
  }[imageName];
}
