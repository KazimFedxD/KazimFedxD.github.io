import nextConfig from "eslint-config-next"

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".idea/**"],
  },
]

export default eslintConfig
