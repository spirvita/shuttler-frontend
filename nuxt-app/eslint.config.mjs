// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import prettierPlugin from "eslint-plugin-prettier";

export default withNuxt([
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true, // 使用分號
          singleQuote: false, // 使用單引號
          tabWidth: 2, // 縮排為 2 個空格
          vueIndentScriptAndStyle: true, // 縮排 <script> 和 <style>
          singleAttributePerLine: true, // 每個屬性換行
          htmlWhitespaceSensitivity: "ignore", // 忽略 HTML 空白敏感度
          trailingComma: "none"
        }
      ],
      "no-console": "warn",
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always"
          },
          svg: "always",
          math: "always"
        }
      ]
    }
  }
]);
