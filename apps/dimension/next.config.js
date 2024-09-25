import withBundleAnalyzer from "@next/bundle-analyzer";
import withRecommendedConfig from "@tooling/next-config/recommended";

export default withBundleAnalyzer({ enabled: false })(withRecommendedConfig());
