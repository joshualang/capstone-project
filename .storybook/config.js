import { configure } from "@storybook/react"
import "@storybook/addon-knobs/register"
import "storybook-addon-jsx/register"
import "@storybook/addon-a11y/register"
// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.js$/), module)
